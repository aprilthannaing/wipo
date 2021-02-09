import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Event, Router, RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-qrstatus',
  templateUrl: './qrstatus.component.html',
  styleUrls: ['./qrstatus.component.styl']
})
export class QrstatusComponent implements OnInit {

  request = { "merId": "", "transRef": "" };
  qrString = "";
  transStatus = "";
  showLoadingIndicator = false;
  amount1: number; amount2: number; currency = "";
  resObj: any = this.Objfun();
  Objfun() {
    return {
      "reqId": "", "merId": "", "subMerId": "", "terminalId": "", "transAmount": "", "transCurrency": "", "ref1": "", "ref2": "",
      "code": "", "msg": "", "merDqrCode": "", "transExpiredTime": "", "refNo": "", "transRef": ""
    };
  }
  constructor(private http: HttpClient,
    private location: Location,
    private router: Router,
    private ics: RpIntercomService) {
    if (this.ics.sessionid == "" || this.ics.sessionid == null) {
      console.log("Session ID is not null or empty");
    } else
      this.checkUser(this.ics.sessionid);

  }

  ngOnInit(): void {
    this.checkStatus();
  }

  checkStatus() {
    const url: string = this.ics._apiurl + "/api/checkqr";
    this.request.merId = "581500000000017";
    this.request.transRef = this.ics.transRef;
    
    this.http.post(url, this.request).subscribe((data: any) => {
      this.transStatus = data.transStatus; // P, S, E

      if (this.transStatus == "S") {
        this.router.navigate(['success']);
      }

      this.showLoadingIndicator = false;
      this.updateStatus(this.transStatus);
    },
      error => {
        alert("Connection Time Out");
      });
  }

  reload() {
    this.showLoadingIndicator = true;
    this.checkStatus();
  }

  cancel() {
    this.router.navigate(['cancel', this.ics.sessionid]);
  }

  nextOne() {
    this.generate();
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    this.cancel();
  }
  generate() {
    const url: string = this.ics._apiurl + "/api/generateqr?sessionID='" + this.ics.sessionid + "'";
    this.resObj.reqId = this.ics.userObj.requestorId;
    this.resObj.merId = "581500000000017";
    this.resObj.subMerId = "0000000001700001";
    this.resObj.terminalId = "03000001";
    this.resObj.transCurrency = this.currency;
    this.resObj.ref1 = "9592353534";
    this.resObj.ref2 = "1004355346"
    this.resObj.transAmount = this.ics.serviceFees + parseInt(this.ics.userObj.totalAmount);
    this.http.post(url, this.resObj).subscribe(
      (data: any) => {
        if (data != null) {
          if (data.code == '0000') {
            this.ics.transRef = data.transRef;
            this.ics.merDqrCode = data.merDqrCode;
            this.router.navigate(['qrcode']);
            this.save(data);
          } else {
            alert("Session is empty");
          }
        } else {
          alert("Connection Time Out");
          console.warn("QR Generate API Connection Time Out......", data);
        }
      },
      error => {
        alert("Connection Time Out");
        console.warn('error', error);
      },
    );
  }

  updateStatus(tranStatus) {
    const json: any = {
      "transStatus": tranStatus,
      "transRef": this.request.transRef
    }
    const url: string = this.ics._apiurl + "/operation/saveCBPaytransaction";
    this.http.post(url, json).subscribe(
      (data: any) => {
        console.log("Save_____");
      },
      error => {
        console.warn('error ', error);
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
    const url: string = this.ics._apiurl + "/operation/saveCBPaytransaction";
    this.http.post(url, JSON.stringify(this.resObj)).subscribe(
      (data: any) => {
        console.log("Save_____");
      },
      error => {
        console.warn('error ', error);
      },
    );
  }
  checkUser(id) {
    const url: string = this.ics._apiurl + "/payments/check";
    const json = {
      "id": id,
      "type": "CBPAY",
    }
    this.http.post(url, json).subscribe((data: any) => {
      if (data.code == "0000") {
        this.amount1 = + data.userObj.amount1;
        this.amount2 = + data.userObj.amount2;
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
