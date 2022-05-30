import { HubConnectionBuilder } from '@microsoft/signalr';

export default class ChatHandler {
    constructor() {
        this.connection = new HubConnectionBuilder()
            .withUrl('/chat')
            .build();
        this.connection.start();
    }
    
    getConnection() {
        return this.connection;
    }
}