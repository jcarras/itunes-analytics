import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import * as socketIO from 'socket.io-client';
import { AppStoreItem, HeatMapUpdate, WebsocketEvents } from '../shared/types';

export interface Socket {
  on(event: string, callback: (data: any) => void );
}

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {

  socket: Socket;
  heatMapObservables: {} = {};
  constructor() { }

  connect(url: string) {
    this.socket = socketIO(url, {transports: ['websocket']});
  }
  getAppItems() : Observable<AppStoreItem[]> {
    return new Observable<AppStoreItem[]>(observer => {
      this.socket.on(WebsocketEvents.AppItemData, (data: AppStoreItem[]) => {
        data.forEach((item: AppStoreItem)=> {
          item.heatMapData = item.heatMapData = new Observable<[]>((observer) => {
            this.heatMapObservables[item.id] = observer;
            this.socket.on(WebsocketEvents.HeatMapUpdate, (heatMapUpdates: HeatMapUpdate[]) => {
              heatMapUpdates.forEach((update) => {
                const observer = this.heatMapObservables[update.id];
                observer.next(update);
              });
            });
          });
        });
        observer.next(data);
      });
    });
  }

  public onEvent(event: WebsocketEvents.Connect): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(WebsocketEvents.Connect, () => observer.next());
    });
  }
}
