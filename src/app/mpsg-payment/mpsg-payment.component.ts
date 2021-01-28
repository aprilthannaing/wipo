import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { formatDate } from '@angular/common';
declare var Checkout: any;
@Component({
  selector: 'app-mpsg-payment',
  templateUrl: './mpsg-payment.component.html',
  styleUrls: ['./mpsg-payment.component.styl']
})

export class MpsgPaymentComponent implements OnInit {
  addScript: boolean = false;
  finalAmount: number;
  mpsgsessionid = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: RpIntercomService) {

  }

  ngOnInit(): void {
  }

  CheckoutConfig = {
    merchant: 'CB0000000342',
    order: {
      customerNote: "WIPO Payment Fee",
      customerOrderDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      description: "WIPO Payment Fee"
    },
    session: {
      id: this.ics.mpsgsessionid //insert your session id
    },

    interaction: {
      operation: "PURCHASE",
      merchant: {
        name: 'Intellectual Property Department',
        logo: ''
      },
      locale: 'en_US',
      theme: 'default',
      displayControl: {
        billingAddress: 'HIDE',
        customerEmail: 'HIDE',
        orderSummary: 'SHOW',
        shipping: 'HIDE',
        paymentConfirmation: "SHOW"
      },
    },

    customer: {
      firstName: 'customer name'
    }
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addMpsgscript().then(() => {
        Checkout.configure(this.CheckoutConfig);
        Checkout.showPaymentPage();
      })
    }
  }



  addMpsgscript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = "https://cbbank.gateway.mastercard.com/checkout/version/57/checkout.js";
      scripttagElement.setAttribute('data-error', this.ics._clienturl + "?id=" + this.ics.sessionid);
      scripttagElement.setAttribute('data-complete', this.ics._clienturl + "/saveMaster?id=" + this.ics.sessionid);
      // scripttagElement.setAttribute('data-cancel', this.ics._clienturl + "?id=" + this.ics.sessionid);
      scripttagElement.setAttribute('data-cancel', this.ics._clienturl + "/cancel?id=" + this.ics.sessionid);

      scripttagElement.setAttribute('data-timeout', this.ics._clienturl + "?id=" + this.ics.sessionid);
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);

    })

  }
}
