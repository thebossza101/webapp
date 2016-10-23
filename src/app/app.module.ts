import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpserviceService } from './shared/httpservice.service';
import { GoogleService } from './shared/google.service';
import { HomeService } from './shared/home.service';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModule} from 'angular2-bootstrap-confirm';
import { SeaFreightRateCenterComponent } from './sea-freight-rate-center/sea-freight-rate-center.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SeaFreightRateCenterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    routing,
    ConfirmModule
  ],
  providers: [HttpserviceService,GoogleService,NgbActiveModal],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
