import { Component, OnInit } from '@angular/core';
import { AppStoreService } from './app-store.service';
import { AppStoreItem, WebsocketEvents } from '../shared/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iTunes Analytics Dashboard';

  appStoreItems: AppStoreItem[] = [];
  serverUrl = 'http://localhost:8080';

  constructor(private appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.appStoreService.connect(this.serverUrl);
    this.appStoreService.onEvent(WebsocketEvents.Connect)
      .subscribe(() => {
        console.log('connected');
        this.appStoreService.getAppItems()
          .subscribe(appStoreItems => {
            this.appStoreItems = appStoreItems;
          });
      });
  }
}
