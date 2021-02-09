import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { MPUPaymentComponent } from './mpu-payment/mpu-payment.component';
import { HttpClientModule} from '@angular/common/http';
import { FailPageComponent } from './fail-page/fail-page.component';
import { HeaderComponent } from './header/header.component';
import { ConfirmComponent } from './qr-confirm/qr-confirm.component';
import { QrPaymentComponent } from './qr-payment/qr-payment.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { MpsgSessionComponent } from './mpsg-session/mpsg-session.component';
import { RpIntercomService } from './framework/rp-intercom.service';
import { MpsgPaymentComponent } from './mpsg-payment/mpsg-payment.component';
import { QrstatusComponent } from './qrstatus/qrstatus.component';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MpsgSaveInfoComponent } from './mpsg-save-info/mpsg-save-infocomponent';

import { MpsgConfirmComponent } from './mpsg-confirm/mpsg-confirm.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { ForwarderGuardComponent } from './forwarder-guard/forwarder-guard.component';
import { CancelComponent } from './cancel/cancel.component';
import { NewComponent } from './new/new.component';

 


// const routes: Routes = [
//   { path: '', component: FailPageComponent },
//   { path: 'home/:id', component: HomeComponent },
//   { path: 'mpu-payment', component: MPUPaymentComponent },
//   { path: 'success', component: SuccessPageComponent },
//   { path: 'fail', component: FailPageComponent },
//   { path: 'confirm', component: ConfirmComponent },
//   {path: 'confirm/:id', component : ConfirmComponent}, 
//   { path: 'qrcode', component: QrPaymentComponent },
//   { path: 'visa', component: MpsgSessionComponent },
//   { path: 'mpsg', component: MpsgPaymentComponent },
//   { path: 'checkStatus', component: QrstatusComponent },
//   { path: 'saveMaster', component: MpsgSaveInfoComponent },
//   { path: 'mpu/frontEndRedirect', component: FrontEndRedirectComponent },
//   { path: 'header', component: HeaderComponent},
//   { path: 'success/:id', component: SuccessPageComponent },
// ];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MPUPaymentComponent,
    FailPageComponent,
    HeaderComponent,
    ConfirmComponent, 
    QrPaymentComponent, 
    MpsgSessionComponent, 
    QrstatusComponent, 
    MpsgSaveInfoComponent, 
    MpsgConfirmComponent, 
    SuccessPageComponent,
    CancelComponent,
    NewComponent,
  ],
  
  imports: [ 
    MatSliderModule,
    MatButtonModule,  
    NgxQRCodeModule,
    HttpClientModule,    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //RouterModule.forRoot(routes,{useHash: false}),
  ],
  providers: [ 
    RpIntercomService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
