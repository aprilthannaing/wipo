import { Component, OnInit, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-mpsg-session',
  templateUrl: './mpsg-session.component.html',
  styleUrls: ['./mpsg-session.component.styl']
})

export class MpsgSessionComponent implements OnInit {
  merchantId = "CB0000000355";
  apiPassword = "50f45faae07ac50972d8414ba0a6bb4d";
  amount1: number;
  amount2: number;
  totalAmount = "";
  returnUrl = this.ics._clienturl + "?saveMaster?id=" + this.ics.sessionid;
  basicAuth = 'Basic QWNWUTBIX05QTVlWMDIzSDhMM3Y2alhNcDRVdaUN2V0M4Mmo4a19hodjdkdS14M3F4dFJ6Y2pNTnRPcGN6OUpPdjU1TW9jTllsEV1p5WURWNm46RUZJRWtJd0dYdDFJSTdFRmlEdVQ3UWExV2ZXWDZnYmw3Z2w5ajgwZVlsVjI1ODdfUTRHSUxCSWxZfOGg1SzRRZTFhMZU1yVgFZGRThIWXAyRjA=';
  successIndicator = "";
  description = "WIPO Payment Fee";
  currency = "MMK";

  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private ics: RpIntercomService) {
  }

  ngOnInit(): void {
    if (this.ics.sessionid == "" || this.ics.sessionid == null)
      console.log("Session ID is not null or empty");
    else
      this.checkUser(this.ics.sessionid);
  }

  generate() {
    const encodedString: any = btoa("merchant." + this.merchantId + ":" + this.apiPassword);
    const url: string = this.ics._apiurl + "/api/generatesession";
    const json: any = {
      "apiOperation": "CREATE_CHECKOUT_SESSION",
      "interaction": {
        "operation": "PURCHASE",
        "returnUrl": this.returnUrl
      },
      "order": {
        "amount": this.totalAmount,
        "currency": this.currency,
        "description": this.description,
        "id": this.ics.orderid
      }
    };

    this.http.post(url, json).subscribe(
      (data: any) => {
        this.ics.mpsgsessionid = data.session.id;
        this.router.navigate(['mpsg']);
        console.log("this.sessionId : ", this.ics.mpsgsessionid);
        console.log("session version: ", data);
      },
      error => {
        this.router.navigate(['fail']);
        console.warn("error: ", error);
      });
  }

  checkUser(id) {
    const url: string = this.ics._apiurl + "/payments/check";
    const json = {
      "id": id,
      "type": "VISA"
    }

    this.http.post(url, json).subscribe((data: any) => {
      if (data.code == "0000") {
        this.totalAmount = (parseInt(data.userObj.totalAmount) + this.ics.serviceFees) + "";
        //this.totalAmount = "10";
        this.currency = data.userObj.currencyType;
        this.ics.orderid = data.userObj.paymentReference + "";
        console.log("orderId !!!!!!!!!!!!!", data.userObj.paymentReference)
        this.generate();
      } else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }
}


