<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Message Container</h3>
    </div>
  </div>
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
      user: null,
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
      
      this.chatConnection.on('ReceiveMessage', (sender, message) => {
        this.user = sender;
        this.message = message;
        console.log('message: ', sender, message);
      });

      this.chatConnection.start().catch(err => console.log('er: ', err))
    },
    sendToAll() {
      this.chatConnection.invoke('SendMessageToAll', 'shuvo', 'message hi hi all')
        .catch(err => console.log(err));
    },
  }
}
</script>