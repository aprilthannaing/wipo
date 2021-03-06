import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.styl']
})
export class SuccessPageComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private ics: RpIntercomService,
    private route: ActivatedRoute,
  ) {
  }
  response = { "requestorId": "", "transactionId": "", "payerName": "", "payerPhone": "", "payerEmail": "", "totalAmount": "", "currencyType" :"" };
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params["id"]; //params.get('id');
      this.sessionOut();
    }) 
  }

  sessionOut() {
    const url: string = this.ics._apiurl + "/payments/sessionOut";
    const json = {
      id: this.ics.sessionid
    }
    this.http.post(url, json).subscribe((data: any) => {
      if (data.code == "0000") {
        this.response.requestorId = data.response.requestorId;
        this.response.transactionId = data.response.transactionId;
        this.response.payerName = data.response.payerName;
        this.response.payerEmail = data.response.payerEmail;
        this.response.payerPhone = data.response.payerPhone;
        this.response.totalAmount = data.response.finalAmount;
        this.response.currencyType = data.response.currencyType;
        this.ics.callBack(this.ics.userObj.paymentReference);
        const json = {
          "sessionId": this.ics.sessionid,
          "paymentStatus": "1",
        }

        this.ics.setPaymentStatus(json);
      }
      else {
        this.router.navigate(['fail']);
      }
    },
      error => {
        this.router.navigate(['fail']);
        console.warn('error', error);
      },
    );
  }

}
