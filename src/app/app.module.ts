import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {QuestoesService} from './app-service';
import { TesteComponent } from './teste/teste.component';
import {RouterModule, ROUTES} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { FirewallComponent } from './firewall/firewall.component';
import {TextMaskModule} from 'angular2-text-mask';


@NgModule({
  declarations: [
    AppComponent,
    TesteComponent,
    FirewallComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    TextMaskModule,
  ],
  providers: [
    QuestoesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
