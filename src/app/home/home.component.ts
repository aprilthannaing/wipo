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
  userName = "Htet Het San";
  email = "htethtetsan57@gmail.com";
  phoneNo = "09784535453";
  description = "ဟိုတယ်ဆိုင်ရာဝန်ဆောင်မှု(အခြေခံ)သင်တန်းများ";
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

  visa() {
    //  this.router.navigate(['visa']);
    this.router.navigate(['visa-confirm']);
  }

  report() {
    window.open("http://localhost:8080/report/visa.xlsx", "_blank");
  }

  checkUser(id) {
    console.log("this.ics.sessionid .....", this.ics.sessionid)

    const url: string = "/payments/check";
    const json = {
      id: id
    }
    this.http.post(url, json).subscribe((data: any) => {
      console.log("data: ", data)
      if (data.code == "0000") {
        this.userObj = data.userObj;
      }
      else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }
}
