
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: RpIntercomService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params.get('id');
      console.log("this.ics.sessionid .....", this.ics.sessionid)
      this.checkUser(this.ics.sessionid);
    })

  }

  payment() {
    this.router.navigate(['mpu-payment']);
  }

  cbPay() {
    this.router.navigate(['confirm']);
  }

  success() {
    this.router.navigate(['success']);
  }

  fail() {
    this.router.navigate(['fail']);
  }

  visa (){
    this.router.navigate(['mpsg-confirm']);    
  }

  report() {
    window.open("http://localhost:8083/report/visa.xlsx", "_blank");
  }

  checkUser(id) {
    console.log("this.ics.sessionid .....", this.ics.sessionid)

    const url: string = "http://localhost:8083/payments/check";
    const json = {
      "id"   : id,
      "type" : ""
    }
    this.http.post(url, json).subscribe((data: any) => {
      console.log("data: ", data)
      if (data.code == "0000") {
        this.userObj = data.userObj;
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

