import { Component, OnInit, HostListener } from '@angular/core';
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
  amount1: number; amount2: number; currency = "";

  Objfun() {
    return {
      "paymentReference": "",
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
    this.route.params.subscribe(params => {
      this.ics.sessionid = params["id"];
      this.checkUser(this.ics.sessionid);
    })
  }

  cancel() {
    this.router.navigate(['home', this.ics.sessionid]);
  }



  generate() {
    this.loading_ = true;
    const json = {
      "sessionId": this.ics.sessionid,
    }

    this.ics.setConfirmationDate(json);
    const url: string = this.ics._apiurl + "/api/generateqr?sessionID=" + this.ics.sessionid;
    this.resObj.reqId = this.ics.userObj.requestorId;
    this.resObj.merId = "581500000000017";
    this.resObj.subMerId = "0000000001700001";
    this.resObj.terminalId = "03000001";
    this.resObj.transCurrency = "MMK";
    this.resObj.ref1 = "9592353534";
    this.resObj.ref2 = "1004355346";
    this.resObj.transAmount = this.ics.serviceFees + parseInt(this.ics.userObj.totalAmount);
    const body = JSON.stringify(this.resObj);
    this.http.post(url, this.resObj).subscribe((data: any) => {
      if (data != null) {
        if (data.code == '0000') {
          this.loading_ = false;
          this.resObj.merDqrCode = data.merDqrCode;
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

  save(obj) {
    this.resObj.code = obj.code;
    this.resObj.msg = obj.msg;
    this.resObj.merDqrCode = obj.merDqrCode;
    this.resObj.refNo = obj.refNo;
    this.resObj.transExpiredTime = obj.transExpiredTime;
    this.resObj.transRef = obj.transRef;
    this.resObj.sessionId = this.ics.sessionid;
    const url: string = this.ics._apiurl + "/operation/saveCBPaytransaction";
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(url, JSON.stringify(this.resObj), { headers: headers }).subscribe(
      (data: any) => {
        console.log("Save___");
      },
      error => {
        console.warn('error___ ', error);
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
        this.resObj.transAmount = data.userObj.finalAmount;
        this.resObj.serviceCharges = data.userObj.serviceCharges;
        this.currency = data.userObj.currencyType;
      } else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }
}