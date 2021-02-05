import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MPUPaymentComponent } from './mpu-payment/mpu-payment.component';
import { from } from 'rxjs';
import { HomeComponent } from './home/home.component';
import { FailPageComponent } from './fail-page/fail-page.component';
import { ConfirmComponent } from './qr-confirm/qr-confirm.component';
import { QrPaymentComponent } from './qr-payment/qr-payment.component';
import { MpsgSessionComponent } from './mpsg-session/mpsg-session.component';
import { QrstatusComponent } from './qrstatus/qrstatus.component';
import { MpsgSaveInfoComponent } from './mpsg-save-info/mpsg-save-infocomponent';
import { MpsgPaymentComponent } from './mpsg-payment/mpsg-payment.component';
import { FrontEndRedirectComponent } from './front-end-redirect/front-end-redirect.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { MpsgConfirmComponent } from './mpsg-confirm/mpsg-confirm.component';
import { CancelComponent } from './cancel/cancel.component';
import { NewComponent } from './new/new.component';


const routes: Routes = [
  { path: '', component: FrontEndRedirectComponent },
  { path: 'home/:id', component: HomeComponent },
  { path: 'mpu-payment', component: MPUPaymentComponent },
  { path: 'mpu-payment/:id', component: MPUPaymentComponent },
  { path: 'fail', component: FailPageComponent },
  { path: 'confirm', component: ConfirmComponent },
  { path: 'confirm/:id', component: ConfirmComponent },
  { path: 'qrcode', component: QrPaymentComponent },
  { path: 'visa', component: MpsgSessionComponent },
  { path: 'mpsg', component: MpsgPaymentComponent },
  { path: 'mpsg/:id', component: MpsgPaymentComponent },
  { path: 'checkStatus', component: QrstatusComponent },
  { path: 'saveMaster', component: MpsgSaveInfoComponent },
  { path: 'saveMaster/:id', component: MpsgSaveInfoComponent },
  // { path: 'frontEndRedirect', component: FrontEndRedirectComponent },
  { path: 'mpsg-confirm', component: MpsgConfirmComponent },
  { path: 'mpsg-confirm/:id', component: MpsgConfirmComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'success/:id', component: SuccessPageComponent },
  { path: 'cancel/:id', component: CancelComponent },
  { path: 'new', component: NewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
