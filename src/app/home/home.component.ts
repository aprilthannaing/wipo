
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  id = "";
  userObj: any;
  choose = false;
  totalAmount = 0;
  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: RpIntercomService,
  ) {
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params.get('id');
      this.checkUser(this.ics.sessionid);
    })

    this.route.params.subscribe(params => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params["id"];
      this.checkUser(this.ics.sessionid);
    })

  }

  choosePayment() {
    if (this.choose)
      this.choose = false;
    else
      this.choose = true;

  }
  payment() {
    this.router.navigate(['mpu-payment', this.ics.sessionid]);
  }

  cbPay() {
    this.router.navigate(['confirm', this.ics.sessionid]);
  }

  success() {
    this.router.navigate(['success']);
  }

  fail() {
    this.router.navigate(['fail']);
  }

  visa() {
    this.router.navigate(['mpsg-confirm', this.ics.sessionid]);
  }

  checkUser(id) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    const url: string = this.ics._apiurl + "/payments/check";
    const json = {
      "id": id,
      "type": ""
    }
    this.http.post(url, json, { headers: headers }).subscribe((data: any) => {
      if (data.code == "0000") {
        this.userObj = data.userObj;
        this.ics.userObj = data.userObj;

      }
      else this.fail();
    },
      error => {
        this.fail();
        console.warn('error', error);
      },
    );
  }
}

