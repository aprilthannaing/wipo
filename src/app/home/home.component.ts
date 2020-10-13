import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {
  id = "";
  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private location: Location,
    private http : HttpClient,
    private ics : RpIntercomService
    ) {   
   }

  ngOnInit(): void { 
    this.route.paramMap.subscribe((params : ParamMap)=> {  
      if(params.get('id') != null)
        this.ics.id = params.get('id');
    })  
  }

  payment(){
    this.router.navigate(['mpu-payment']);
  } 

  cbPay(){
    this.router.navigate(['confirm',this.ics.id]);
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

  saveMaster () {
    this.router.navigate(['saveMaster']);
  }
}
