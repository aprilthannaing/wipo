import { Component, OnInit } from '@angular/core';
import { RpIntercomService } from './framework/rp-intercom.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var jQuery: any;

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit{
  urlbits = [];
  sessionId: string;
  constructor(
    private router : Router
  ){}
    ngOnInit(){
      console.log(window.location.href)
      this.urlbits = window.location.href.split("=");
      this.sessionId = this.urlbits[this.urlbits.length-1];
      console.log(this.sessionId)
      this.router.navigate(['home', this.sessionId]);
    }
}
