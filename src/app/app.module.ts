import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { MPUPaymentComponent } from './mpu-payment/mpu-payment.component';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { SuccessPageComponent } from './success-page/success-page.component';
import { FailPageComponent } from './fail-page/fail-page.component';
import { HeaderComponent } from './header/header.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { QrPaymentComponent } from './qr-payment/qr-payment.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VisaMasterComponent } from './visa-master/visa-master.component';
import { RpIntercomService } from './framework/rp-intercom.service';
import { MpsgPaymentComponent } from './mpsg-payment/mpsg-payment.component';
import { QrstatusComponent } from './qrstatus/qrstatus.component';
import {MatButtonModule} from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { SaveMasterInfoComponent } from './save-master-info/save-master-info.component';
import { FrontEndRedirectComponent } from './front-end-redirect/front-end-redirect.component';

const routes: Routes = [
  //{ path: '', component: FailPageComponent },
  { path: '', component: HomeComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'mpu-payment', component: MPUPaymentComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'fail', component: FailPageComponent },
  { path: 'confirm', component: ConfirmComponent },
  {path: 'confirm/:id', component : ConfirmComponent}, 
  { path: 'qrcode', component: QrPaymentComponent },
  { path: 'visa', component: VisaMasterComponent },
  { path: 'mpsg', component: MpsgPaymentComponent },
  { path: 'checkStatus', component: QrstatusComponent },
  { path: 'saveMaster', component: SaveMasterInfoComponent },
  { path: 'mpu/frontEndRedirect', component: FrontEndRedirectComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MPUPaymentComponent,
    SuccessPageComponent,
    FailPageComponent,
    HeaderComponent,
    ConfirmComponent, 
    QrPaymentComponent, 
    VisaMasterComponent, 
    QrstatusComponent, 
    SaveMasterInfoComponent, 
    FrontEndRedirectComponent,
  ],
  
  imports: [ 
    MatSliderModule,
    MatButtonModule,  
    NgxQRCodeModule,
    HttpClientModule,    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes,{useHash: false}),
    FontAwesomeModule,
  ],
  providers: [ 
    RpIntercomService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
