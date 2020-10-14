import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  userName = "Htet Het San";
  email = "htethtetsan57@gmail.com";
  phoneNo = "09784535453";
  description = "ဟိုတယ်ဆိုင်ရာဝန်ဆောင်မှု(အခြေခံ)သင်တန်းများ";

  constructor(
    private router: Router,
    private location: Location,
    private http : HttpClient,
    ) {   
   }

  ngOnInit(): void {   
  }

  payment(){
    this.router.navigate(['mpu-payment']);
  } 

  cbPay(){
    this.router.navigate(['confirm']);
  } 

  success(){
    this.router.navigate(['success']);
  } 

  fail(){
    this.router.navigate(['fail']);
  } 

  visa (){
    this.router.navigate(['visa']);
  }

  report () {
    window.open("http://localhost:8081/report/visa.xlsx", "_blank");
  }
}
