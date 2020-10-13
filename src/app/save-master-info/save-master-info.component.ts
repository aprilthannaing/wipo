import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-save-master-info',
  templateUrl: './save-master-info.component.html',
  styleUrls: ['./save-master-info.component.styl']
})
export class SaveMasterInfoComponent implements OnInit {
  json: any = {};
  response: any;
  constructor(
    private router: Router,
    private location: Location,
    private ics: RpIntercomService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    console.log("orderid: " + this.ics.orderid)
     this.getOrderId();
  }

  getOrderId() {
    console.log(" Order ID before saving: " + this.ics.orderid);
    const url: string = "/api/rest/version/57/merchant/CB0000000342/order/" +  this.ics.orderid;
     this.http.request('get', url).subscribe(
      (data: any) => {
        this.response = data;
        this.json = {
          "gatewayEntryPoint": data.transaction[0].gatewayEntryPoint,
          "amount": data.amount,
          "currency": data.transaction[0].transaction.currency,
          "transactionId": data.transaction[0].transaction.acquirer.transactionId,
          "receipt": data.transaction[0].transaction.receipt,
          "source": data.transaction[0].transaction.source,
          "taxAmount": data.transaction[0].transaction.taxAmount,
          "terminal": data.transaction[0].transaction.terminal,
          "type": data.sourceOfFunds.type,
          "version": data.transaction[0].version,
          "merchantId": data.merchant,
          "merchantCategoryCode": data.merchantCategoryCode,
          "orderId": data.id,
          "description": data.description,
          "creationTime": data.creationTime,
          "customerName": data.customer.firstName + data.customer.lastName,
          "customerOrderDate": data.customerOrderDate,
          "deviceType": data.device.browser,
          "ipAddress": data.device.ipAddress,
          "result": data.result,
          "brand": data.sourceOfFunds.provided.card.brand,
          "expiryMonth": data.sourceOfFunds.provided.card.expiry.year,
          "expiryYear": data.sourceOfFunds.provided.card.expiry.month,
          "fundingMethod": data.sourceOfFunds.provided.card.fundingMethod,
          "issuer": data.sourceOfFunds.provided.card.issuer,
          "nameOnCard": data.sourceOfFunds.provided.card.nameOnCard,
          "number": data.sourceOfFunds.provided.card.number,
          "scheme": data.sourceOfFunds.provided.card.scheme,
          "storedOnFile": data.sourceOfFunds.provided.card.storedOnFile,
          "status": data.status,
          "totalAuthorizedAmount": data.totalRefundedAmount,
          "totalCapturedAmount": data.totalRefundedAmount,
          "totalRefundedAmount": data.totalRefundedAmount
        }
        console.log("json......" , this.json);
        this.save(this.json);
      },
      error => {
        this.router.navigate(['fail']);
        console.warn("error: ", error);
      });
  }

  save(json: any) {
    console.log("json: ", this.json);
    const url: string = "/operation/saveVisa";
    this.http.request('post', url, { body: json }).subscribe(
      (data: any) => {
        console.log("response: ", data);
      },
      error => {
        console.warn("error: ", error);
      });
  }
}
