import { AppStoreItemsDataSet } from './src/app-store-items-dataset';
import {  WebsocketEvents } from './src/shared/types';
import { getTestHeatMapUpdates } from './src/test-data-generator';
import * as http from 'http';
import * as express from 'express'; 
import * as socketio from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on(WebsocketEvents.Connection, socket => {
  this.socket = socket;
  this.socket.emit(WebsocketEvents.AppItemData, AppStoreItemsDataSet);
  startHeatMapUpdates();
});

const startHeatMapUpdates = ()=> {
  const updateTimer = setInterval(()=> {
    this.socket.emit(WebsocketEvents.HeatMapUpdate, getTestHeatMapUpdates());
  }, 1000);

  // for demo purposes just send updates for 3 minutes.
  setTimeout(()=> { 
    clearInterval(updateTimer); 
  }, 3000 * 60);
}

server.listen(8080);
console.log('Web socket started.');