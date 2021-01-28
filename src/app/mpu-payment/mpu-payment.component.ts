
import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-mpu-payment',
  templateUrl: './mpu-payment.component.html',
  styleUrls: ['./mpu-payment.component.styl']
})
export class MPUPaymentComponent implements OnInit {

  form: FormGroup;
  payment = {
    "merchantId": "", "invoiceNo": "",
    "productDesc": "", "amount": "", "currencyCode": "",
    "userDefined1": "", "userDefined2": "", "userDefined3": "",
    "hashValue": ""
  };
  serviceCharges = "";
  totalAmount = ""; mber; currency = "";
  mpuData: any = '';
  html: string = '';
  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private ics: RpIntercomService) { }

  ngOnInit(): void {
    if (this.ics.sessionid == "" || this.ics.sessionid == null)
      console.log("Session ID is not null or empty");
    else
      this.checkUser(this.ics.sessionid);
  }

  submitForm() {
    //  const url: string = this.ics._mpuurl + "/UAT/Payment/Payment/pay";
    const url: string = this.ics._apiurl + "/api/mpu";

    this.payment.merchantId = "204104001305226";
    this.payment.productDesc = "Wipo";
    this.payment.amount = this.totalAmount;
    this.payment.currencyCode = "104";
    this.payment.userDefined1 = this.ics.sessionid;
    this.payment.userDefined2 = "new switch";
    this.payment.userDefined3 = "test transaction";
    this.payment.hashValue = this.getHashValue().toLocaleUpperCase();
    const json: any = this.payment;
    // let headers = new HttpHeaders();
    // headers = headers.append('Accept', "application/json");
    // headers = headers.append('rejectUnauthorized', "false");

    //  this.http.post(url, json, { headers: headers, responseType: 'text' as 'json', observe: 'response' }).subscribe(
    this.http.post(url, json, { responseType: 'text' as 'json', observe: 'response' }).subscribe(

      data => {
        window.location.href = "https://122.248.120.252:60145/UAT/Payment/Payment/pay";

        console.log("data!!!!!!", data)
      },
      error => {
        this.router.navigate(['fail']);
        console.warn('error', error);
      },
    );


  }

  getHashValue(): string {
    let params: Array<string> = [this.payment.merchantId, this.payment.invoiceNo, this.payment.productDesc, this.payment.amount, this.payment.currencyCode, this.payment.userDefined1, this.payment.userDefined2, this.payment.userDefined3];
    params.sort();
    let paramStr = "";
    for (var str of params) {
      paramStr += str + "";
    }

    const key = "7M8N3SLQ8QILSN6DOZIN1NBOVWMMGIVA";

    var crypto = require("crypto");
    var hashValue = crypto.createHmac('sha1', key).update(paramStr).digest('hex') + "";
    return hashValue;
  }

  cancel() {
    //this.location.back();
    this.router.navigate(['home', this.ics.sessionid]);
  }

  checkUser(id) {
    const url: string = this.ics._apiurl + "/payments/check";
    const json = {
      "id": id,
      "type": "MPU"
    }
    this.http.post(url, json).subscribe((data: any) => {
      if (data.code == "0000") {
        //let amount =+ data.userObj.amount1;
        //let tax =+ data.userObj.amount2;
        //let totalAmount = amount + tax;
        this.serviceCharges = data.userObj.serviceCharges;
        let amounttemp = parseFloat(data.userObj.finalAmount + "00");
        this.totalAmount = this.padFun(amounttemp, 12);
        this.currency = data.userObj.currencyType;
        this.payment.invoiceNo = data.userObj.Id + "";
        console.log(" this.payment.invoiceNo !!!!!!!!!!!!", this.payment.invoiceNo);
      } else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }
  //String.format("%12d", amounttemp);
  padFun(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }
}
