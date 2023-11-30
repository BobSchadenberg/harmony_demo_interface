import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RosService } from 'src/services/ros.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { Card, CardModule } from 'primeng/card';

import { WindowRef } from 'src/services/window.service'

const config: SocketIoConfig = { url: ':5000', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    SelectButtonModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [ WindowRef, RosService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
