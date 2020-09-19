import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location
    ) {    
   }

  ngOnInit(): void {   
  }

  payment(){
    this.router.navigate(['payment']);
  } 

  cbPay(){
    this.router.navigate(['cbPay']);
  } 

  success(){
    this.router.navigate(['success']);
  } 

  fail(){
    this.router.navigate(['fail']);
  } 
}
