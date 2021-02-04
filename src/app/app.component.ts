import { Component, OnInit } from '@angular/core';
import { RpIntercomService } from './framework/rp-intercom.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var jQuery: any;

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  urlbits = [];
  sessionId: string;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }
  ngOnInit() {
    console.log("window.location.href!!!!!!!!!!", window.location.href)

    if (window.location.href.includes("cancel")) {
      this.urlbits = window.location.href.split("=");
      this.sessionId = this.urlbits[this.urlbits.length - 1];
      console.log("cancelling   !!!!!!!!!!!!!!!!!!!!!!!!!", this.sessionId)

      const json = {
        "sessionId": this.sessionId,
        "paymentStatus": "-1",
      }


      const url: string = "https://ipdpayment.cbbank.com.mm/payment" + "/payments/paymentStatus";
      //   const url: string = "http://localhost:8082" + "/payments/paymentStatus";

      this.http.post(url, json).subscribe((data: any) => {
        console.log("data  : ", data)
      },
        error => {
          console.warn('error', error);
        },
      );

    }

    if (window.location.href.includes("success")) {
      this.urlbits = window.location.href.split("=");
      this.sessionId = this.urlbits[this.urlbits.length - 1];
      console.log(this.sessionId)
      this.router.navigate(['success', this.sessionId]);
    } else if (window.location.href.includes("saveMaster")) {
      if (window.location.href.includes("id=")) {
        this.urlbits = window.location.href.split("=");
        this.urlbits = this.urlbits[1].split("&");
        this.sessionId = this.urlbits[0];
        this.router.navigate(['saveMaster', this.sessionId]);
        console.log(this.sessionId)
      }

    } else if (window.location.href.includes("id=")) {
      this.urlbits = window.location.href.split("=");
      this.sessionId = this.urlbits[this.urlbits.length - 1];
      console.log(this.sessionId)
      this.router.navigate(['home', this.sessionId]);
    }
  }
}
