import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';

import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {AngularFireMessaging, AngularFireMessagingModule} from '@angular/fire/compat/messaging';
import {getToken} from '@angular/fire/app-check';
import {getMessaging, onMessage} from '@angular/fire/messaging';
import {environment} from '../environments/environment';
import {OrderTableResponseDto} from '../models/OrderTableResponseDto';
import {NgForOf} from '@angular/common';
import {WebsocketService} from '../services/web-socket.service';
import {Client, CompatClient, Stomp} from '@stomp/stompjs';

// @ts-ignore
@Component({
  selector: 'app-root',
  imports: [

    HttpClientModule,

    // Initialize Firebase
    AngularFireMessagingModule,
    NgForOf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  messages: any[] = [];
  token:string=''
  private messageSubscription!: Subscription;
  orders:OrderTableResponseDto[]=[]
  currentMessage = new BehaviorSubject(null);
  constructor(private http:HttpClient,private angularFireMessaging: AngularFireMessaging,private websocketService:WebsocketService) {
    this.requestPermission()
    // this.getOrders()

    this.angularFireMessaging.messages.subscribe(
      (_messaging:any) => {
        console.log(_messaging)
        const obj = JSON.parse(_messaging.data.orders);
        console.log(obj)
        // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        // _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
       this.token=token!
        this.saveToken()
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload:any) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload!);
      })
  }
// getOrders(){
//     this.websocketService.getAllOrders().subscribe((response)=>{
//       this.orders=response.data
//     })
// }
saveToken(){
    const body={
      "token":this.token,
      "department": "WAITER"
    }

    this.http.post("http://localhost:8081/api/notifications/save-token",body).subscribe((response)=>{
      console.log(response)
    })
}
}
