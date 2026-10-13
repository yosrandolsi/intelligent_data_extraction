import { NgModule } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';

@NgModule({
  imports: [
    SocketIoModule.forRoot({ url: 'http://localhost:5000', options: {} })
  ],
  exports: [
    SocketIoModule
  ]
})
export class WebsocketModule { }
