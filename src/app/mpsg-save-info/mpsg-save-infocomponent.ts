import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-mpsg-save-info',
  templateUrl: './mpsg-save-info.component.html',
  styleUrls: ['./mpsg-save-info.component.styl']
})
export class MpsgSaveInfoComponent implements OnInit {
  json: any = {};
  response: any;
  constructor(
    private router: Router,
    private location: Location,
    private ics: RpIntercomService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {   
    if(this.ics.sessionid == "" || this.ics.sessionid == null)  
      console.log("Session ID is not null or empty"); 
    else
      this.checkUser(this.ics.sessionid);
  }

  getOrderId() {
    console.log(" Order ID before saving: " + this.ics.orderid);
    const url: string = this.ics._visaurl + "/api/rest/version/57/merchant/CB0000000342/order/" +  this.ics.orderid;
    const headers =  {
      "Authorization": "Basic bWVyY2hhbnQuQ0IwMDAwMDAwMzQyOmEzMTAyZTEzNmJkYzhlYjdkOTg2ODA0ZGZhNTMzZTAy"
    }
    this.http.request('get', url, {headers: headers}).subscribe(
      (data: any) => {
        this.response = data;
        console.log(data.description)
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
    const url: string = this.ics._apiurl + "/operation/saveVisa";
    this.http.post(url,json).subscribe(
      (data: any) => {
        console.log("response: ", data);
      },
      error => {
        console.warn("error: ", error);
      });
  }

  checkUser(id){
    const url: string = this.ics._apiurl + "/payments/check"; 
    const json = {
      "id"   : id,
      "type" : "VISA"
    }
    this.http.post(url,json).subscribe((data:any)=> {
        if(data.code == "0000"){
          this.getOrderId();
          this.router.navigate(['success']);
        }else 
          this.router.navigate(['fail']);
      },
      error => {  
        this.router.navigate(['fail']); 
        console.warn('error' , error);             
      }, 
    ); 
  }
}
