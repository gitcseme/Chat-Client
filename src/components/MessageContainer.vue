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
      >
        <div class="col-auto">
          {{ message.sender.nickName }} says:
        </div>
        <div class="col">
          {{ message.message }}
        </div>
      </div>
    </section>
    <section class="row">
      <div class="col-md-10 message-input">
        <input 
          class="form-control" 
          type="text" 
          v-model="message" 
          placeholder="Type a message..."
        />
      </div>
      <div class="col-md-2">
        <button 
          :disabled="message.length === 0" 
          class="btn btn-outline-primary" 
          @click="sendToAll"
        >
          Send
        </button>
      </div>
    </section>
  </section>
</template>

<script>
// import signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

export default {
  name: 'MessageContainer',
  data() {
    return {
      chatConnection: null,
      messages: [],
      message: '',
      loggedInUser: this.$store.getters.getUser,
    }
  },
  mounted() {
    window.VUE = this;

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
        sender: this.loggedInUser
      }

      this.chatConnection.invoke('SendMessageToAll', message)
        .catch(err => console.log(err));
    },
    sendPrivate() {
      // this.chatConnection.invoke('SendPrivateMessage', )
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
</style>