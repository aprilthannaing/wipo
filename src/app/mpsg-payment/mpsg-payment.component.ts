import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router} from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';
declare var Checkout: any;
@Component({
  selector: 'app-mpsg-payment',
  templateUrl: './mpsg-payment.component.html',
  styleUrls: ['./mpsg-payment.component.styl']
})
  
export class MpsgPaymentComponent implements OnInit {
  addScript: boolean = false;
  finalAmount : number;
  constructor(
    private router: Router,
    private http : HttpClient,
    private ics : RpIntercomService) {
    }

  ngOnInit(): void {
 }
  
  CheckoutConfig = {
    merchant: 'CB0000000342',
    order: {
      customerNote: "MOHT Payment Fee",
      customerOrderDate: "2020-09-22",
      description: 'MOHT Payment Fee',
    },
    session: {
      id: this.ics.sessionid //insert your session id
    },              

    interaction: {
      operation: "PURCHASE",
      merchant      : {
        name   : 'WIPO',
        logo   : ''
      },
      locale        : 'en_US',
      theme         : 'default',
      displayControl: {
        billingAddress : 'HIDE',
        customerEmail  : 'HIDE',
        orderSummary   : 'SHOW',
        shipping       : 'HIDE',
        paymentConfirmation : "SHOW"
      },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    },

    customer:{ 
      firstName : 'customer name'
    }
  }

  ngAfterViewChecked():void{
    if(!this.addScript){
      this.addMpsgscript().then(()=>{
        Checkout.configure(this.CheckoutConfig);
        Checkout.showPaymentPage();
      })
    }
  }
  addMpsgscript(){
    this.addScript = true;
    return new Promise((resolve,reject)=>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src = "https://cbbank.gateway.mastercard.com/checkout/version/57/checkout.js";
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })    
  }
}
