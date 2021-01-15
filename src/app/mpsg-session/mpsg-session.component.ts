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
  amount1 :number;
  amount2 :number;
  totalAmount = "";
  returnUrl = this.ics._clienturl + "/saveMaster";
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
    if(this.ics.sessionid == "" || this.ics.sessionid == null)  
      console.log("Session ID is not null or empty"); 
    else
      this.checkUser(this.ics.sessionid);
  }

  generate() {
    const encodedString: any = btoa("merchant." + this.merchantId + ":" + this.apiPassword);
    const url: string = this.ics._visaurl + "/api/rest/version/57/merchant/CB0000000342/session";    
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
        "amount": this.totalAmount,
        "currency": this.currency,
        "description": this.description,
        "id": this.ics.orderid
      }
    };
    this.http.post(url,json,{headers: headers}).subscribe(
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

  checkUser(id){
    const url: string ="http://localhost:8080/payment/payments/check"; 
    // this.ics._apiurl + 
    const json = {
      "id"   : id,
      "type" : "VISA"
    }
    this.http.post(url,json).subscribe((data:any)=> {
        if(data.code == "0000"){
          this.amount1 =+ data.userObj.amount1;
          this.amount2 =+ data.userObj.amount2;
          this.totalAmount = this.amount1 + this.amount2 + ".00";
          this.currency = data.userObj.currencyType;
          this.ics.orderid = data.userObj.Id + ""; 
          console.log("orderId !!!!!!!!!!!!!" , data.userObj.paymentId)
          this.generate();
        }else this.router.navigate(['fail']);
      },
      error => {   
        console.warn('error' , error);             
      }, 
    ); 
  }
}


