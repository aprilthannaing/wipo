import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-qr-payment',
  templateUrl: './qr-payment.component.html',
  styleUrls: ['./qr-payment.component.styl']
})
export class QrPaymentComponent implements OnInit {
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  merDqrCode = "";
  constructor(private http: HttpClient,
    private location: Location,
    private router: Router,
    private ics: RpIntercomService) {
  }

  ngOnInit(): void {
    this.merDqrCode = this.ics.merDqrCode;
  }

  cancel() {
    this.router.navigate(['confirm']);
  }

  checkStatus() {
    this.router.navigate(['checkStatus']);
  }
}
