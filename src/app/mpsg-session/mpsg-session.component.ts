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
  amount = "10.00";
  returnUrl = "http://localhost:8080/wipo/saveMaster";
  basicAuth = 'Basic QWNWUTBIX05QTVlWMDIzSDhMM3Y2alhNcDRVdaUN2V0M4Mmo4a19hodjdkdS14M3F4dFJ6Y2pNTnRPcGN6OUpPdjU1TW9jTllsEV1p5WURWNm46RUZJRWtJd0dYdDFJSTdFRmlEdVQ3UWExV2ZXWDZnYmw3Z2w5ajgwZVlsVjI1ODdfUTRHSUxCSWxZfOGg1SzRRZTFhMZU1yVgFZGRThIWXAyRjA=';
  successIndicator = "";
  description = "WIPO Payment Fee";
  currency = "MMK";

  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private ics: RpIntercomService) {
    this.generate();
  }

  ngOnInit(): void {
  }

  generate() {
    const encodedString: any = btoa("merchant." + this.merchantId + ":" + this.apiPassword);
   // const url: string = "/api/rest/version/57/merchant/CB0000000342/session";    
    const url: string = "https://cbbank.gateway.mastercard.com/api/rest/version/57/merchant/CB0000000342/session";
    const headers = {
      "Authorization": "Basic bWVyY2hhbnQuQ0IwMDAwMDAwMzQyOmEzMTAyZTEzNmJkYzhlYjdkOTg2ODA0ZGZhNTMzZTAy"
    }
    
    const json: any = {
      "apiOperation": "CREATE_CHECKOUT_SESSION",
      "interaction": {
        "operation": "PURCHASE",
        "returnUrl": this.returnUrl
      },
      "order": {
        "amount": this.amount,
        "currency": this.currency,
        "description": this.description,
        "id": this.ics.orderid
      }
    };
    this.http.request('post', url,{ headers: headers, body: json }).subscribe(
      (data: any) => {
        this.ics.sessionid = data.session.id;
        this.router.navigate(['mpsg']);
        console.log("this.sessionId : ", this.ics.sessionid);
        console.log("session version: ", data);
      },
      error => {
        this.router.navigate(['fail']);
        console.warn("error: ", error);
      });
  }
}


