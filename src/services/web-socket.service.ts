import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { StompSubscription } from '@stomp/stompjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseResponse } from '../models/BaseResponse';
import { OrderTableResponseDto } from '../models/OrderTableResponseDto';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService  {

  // private connection: CompatClient;
  private subscription: StompSubscription | undefined;

  constructor(private http: HttpClient) {
    // this.connection = Stomp.client('ws://test.mashalounge.com/order-updates');
    // // Setting headers for WebSocket connection (optional, if needed)
    // const headers = {
    //   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInN1YiI6ImFkbWluIiwiaWF0IjoxNzM4NTM1Mjg3LCJleHAiOjE3Mzg2MjE2ODd9.NQbUTQUD7pmlOZpre4FAucLg7aPEC2_9ZEmLCPpTdL4'
    // };
    //
    // // Connect with Authorization header
    // this.connection.connect(headers, () => {
    //   console.log('WebSocket connected');
    // }, (error:any) => {
    //   console.error('WebSocket connection error:', error);
    // });
  }

  getAllOrders() {
    const httpHeaders = new HttpHeaders().set('Authorization', 'Bearer YOUR_JWT_TOKEN');
    return this.http.get<BaseResponse<OrderTableResponseDto[]>>('https://test.mashalounge.com/api/orders/items');
  }

  // public listen(fun: any): void {
  //   if (this.connection) {
  //     // Subscribe to a specific destination (e.g., /topic/order-updates)
  //     this.subscription = this.connection.subscribe('/topic/order-updates', message => {
  //       console.log('Received message:', message.body);
  //       fun(JSON.parse(message.body));
  //     });
  //   }
  // }
  //
  // ngOnDestroy(): void {
  //   if (this.subscription) {
  //     this.subscription.unsubscribe();
  //   }
  //   if (this.connection) {
  //     this.connection.deactivate(); // Properly close the WebSocket connection
  //   }
  // }
}
