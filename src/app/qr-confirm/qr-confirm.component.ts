import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { tap, map } from 'rxjs/operators'
@Component({
  selector: 'app-confirm',
  templateUrl: './qr-confirm.component.html',
  styleUrls: ['./qr-confirm.component.styl']
})
export class ConfirmComponent implements OnInit {
  loading_ = false;
  id = "";
  request = { "merId": "", "transRef": "" };
  resObj: any = this.Objfun();
  qrString = "";
  amount1: number;amount2: number; currency = "";

  Objfun() {
    return {
      "paymentReference":"",
      "code": "", "msg": "", "merDqrCode": "", "transExpiredTime": "", "refNo": "", "transRef": ""
    };
  }

  constructor(private http: HttpClient,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private ics: RpIntercomService) {
  }
  sub: any;
  ngOnInit(): void {   
    if(this.ics.sessionid == "" || this.ics.sessionid == null)  
      console.log("Session ID is not null or empty"); 
    else
      this.checkUser(this.ics.sessionid);
  }

  cancel() {
    this.router.navigate(['home', this.ics.sessionid]);
  }
  generate() {
    this.loading_ = true;
    const url: string =  this.ics._cbpayurl + "/payment-api/v1/qr/generate-transaction.service";
    this.resObj.reqId =  "2d21a5715c034efb7e0aa383b885fc7a";
    this.resObj.merId = "581500000000017";
    this.resObj.subMerId = "0000000001700001";
    this.resObj.terminalId = "03000001";
      //this.resObj.transAmount = this.amount + 500;
    this.resObj.transCurrency =  "MMK";
    this.resObj.ref1 = "9592353534";
    this.resObj.ref2 = "1004355346";
    const json ={
      reqId:this.resObj.reqId,
      merId:this.resObj.merId,
      subMerId:this.resObj.subMerId,
      terminalId:this.resObj.terminalId,
      transCurrency:this.resObj.transCurrency,
      ref1:this.resObj.ref1,
      ref2:this.resObj.ref2,
    }
     const body = JSON.stringify(this.resObj);
      let headers = new HttpHeaders();
      headers = headers.append('Content-Type', 'application/json');
      headers = headers.append('Authen-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTY3NzU2NzIsIm1lcklkIjoiNTgxNTAwMDAwMDAwMDE3In0.hO4-eWFQHM5STCydXlwr2SjghmFe_4GgmccBq3vJvUY");
      this.http.post(url,json,{headers: headers}).subscribe((data:any)=> {
        if(data.code == '0000'){
          this.loading_ = false;
          this.resObj.merDqrCode = data.merDqrCode;
          this.ics.transRef = data.transRef;
          this.ics.merDqrCode = data.merDqrCode;
          this.router.navigate(['qrcode']);
          this.save(data);
        }else{
          console.warn("fail: " , data);
        }
      },
      error => {   
        console.warn('error' , error);             
     },
     );
  }

  save(obj) {
    this.resObj.code = obj.code;
    this.resObj.msg = obj.msg;
    this.resObj.merDqrCode = obj.merDqrCode;
    this.resObj.refNo = obj.refNo;
    this.resObj.transExpiredTime = obj.transExpiredTime;
    this.resObj.transRef = obj.transRef;
    this.resObj.sessionId = this.ics.sessionid;
    const url: string = this. ics._apiurl + "/operation/saveCBPaytransaction";
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    //headers = headers.append('Authen-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTY3NzU2NzIsIm1lcklkIjoiNTgxNTAwMDAwMDAwMDE3In0.hO4-eWFQHM5STCydXlwr2SjghmFe_4GgmccBq3vJvUY");
    this.http.post(url, JSON.stringify(this.resObj), { headers: headers }).subscribe(
      (data: any) => {
        console.log("Save___" + data);
      },
      error => {
        console.warn('error___ ', error);
      },
    );
  }

  checkUser(id) {
    const url: string =this.ics._apiurl  +  "/payments/check";
    const json = {
      "id"   : id,
      "type" : "CBPAY"
    }
    this.http.post(url, json).subscribe((data: any) => {
      if (data.code == "0000") {
          this.amount1 =+ data.userObj.amount1;
          this.amount2 =+ data.userObj.amount2;
          this.resObj.transAmount = this.amount1 + this.amount2;
          this.currency = data.userObj.currencyType;
      } else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }

}