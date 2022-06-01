<template>
  <section class="message-wrapper">
    <section class="row">
      <div class="col-md-12">
        <h4>Messages</h4>
      </div>
    </section>
    <section v-if="messages.length > 0">
      <div 
        class="row message"
        v-for="(message, index) in messages" :key="index"
        :class="{ 'private-message': message.privacy === PrivacyType.Private }"
      >
        <div class="col-auto">
          {{ message.sender.nickName }} says:
        </div>
        <div class="col">
          {{ message.message }}
        </div>
      </div>
    </section>

    <!-- Send button -->
    <section class="row">
      <div class="col-md-9 message-input">
        <input 
          class="form-control" 
          type="text" 
          v-model="message" 
          placeholder="Type a message..."
        />
      </div>
      <div class="col-md-3">
        <button 
          v-if="messageType === 'private'"
          :disabled="message.length === 0" 
          class="btn btn-outline-warning" 
          @click="sendPrivate"
        >
          Send private
        </button>
        <button 
          v-else 
          :disabled="message.length === 0" 
          class="btn btn-outline-primary" 
          @click="sendToAll"
        >
          Broadcast
        </button>
      </div>
    </section>
  </section>
</template>

<script>
// import signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Privacy from '../constants/MessagePrivacy';

export default {
  name: 'MessageContainer',
  data() {
    return {
      chatConnection: null,
      messages: [],
      message: '',
      PrivacyType: Privacy,
      loggedInUser: this.$store.getters.getUser,
      messageType: 'broadcast',
      receiver: null,
    }
  },
  mounted() {
    window.VUE = this;

    this.loadLintensers();
    this.buildConnection();
  },
  methods: {
    buildConnection() {
      this.chatConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7067/chat')
        .build();
      
      this.chatConnection.on('ReceiveMessage', (data) => {
        this.messages.push(data);
        console.log('message-received: ', data);
      });

      this.chatConnection.start().catch(err => console.log('er: ', err))
    },
    sendToAll() {
      let message = {
        message: this.message,
        sender: this.loggedInUser,
        privacy: this.PrivacyType.Public
      }

      this.chatConnection.invoke('SendMessageToAll', message)
        .catch(err => console.log(err));
    },
    sendPrivate() {
      let message = {
        sender: this.loggedInUser,
        receiverId: this.receiver.id,
        message: this.message
      }

      this.chatConnection.invoke('SendPrivateMessage', message)
        .catch(err => console.log('private: ', err));
    },
    loadLintensers() {
      this.$root.$on('broadcast', () => {
        this.messageType = 'broadcast';
      });

      this.$root.$on('sendPrivateMessage', (receiver) => {
        this.messageType = 'private';
        this.receiver = receiver;
      });
    }
  }
}
</script>

<style>
  .message-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .private-message {
    background-color: darkslategray;
  }

</style>