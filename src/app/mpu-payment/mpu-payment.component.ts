
import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
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
  serviceCharges = 0;
  totalAmount = ""; mber; currency = "";
  mpuData: any = '';
  html: string = '';
  constructor(
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: RpIntercomService) { }

  ngOnInit(): void {
    this.serviceCharges = this.ics.serviceFees;
    this.route.params.subscribe(params => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params["id"];
      console.log("this.ics.sessionid .....", this.ics.sessionid)
      this.checkUser(this.ics.sessionid);
    })


    // if (this.ics.sessionid == "" || this.ics.sessionid == null)
    //   console.log("Session ID is not null or empty");
    // else
    //   this.checkUser(this.ics.sessionid);
  }

  submitForm() {
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

        this.serviceCharges = data.userObj.serviceCharges;
        let amounttemp = parseFloat(data.userObj.finalAmount + "00");
        this.totalAmount = this.padFun(amounttemp, 12);
        this.currency = data.userObj.currencyType;


        this.payment.invoiceNo = parseInt(data.userObj.Id) + 10000 + "";
        const amount = (parseInt(data.userObj.totalAmount) + this.ics.serviceFees) + "";

        var addition = "";
        if (amount.length < 12) {
          const toadd = 10 - amount.length;
          for (var i = 0; i < toadd; i++) {
            addition += "0";
          }   
        }

        this.payment.amount = addition + amount + "00";
        this.payment.currencyCode = "104";
        this.payment.merchantId = "204104001305226";
        this.payment.productDesc = "Wipo";
        this.payment.userDefined1 = this.ics.sessionid;
        this.payment.userDefined2 = "new switch";
        this.payment.userDefined3 = "test transaction";
        this.payment.hashValue = this.getHashValue().toLocaleUpperCase();

        console.log("payment !!!!!!!!!!!!", this.payment);
      } else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }
  padFun(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log("MPU Payment Back Action...........");
  }
}

