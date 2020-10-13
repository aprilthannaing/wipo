import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-fail-page',
  templateUrl: './fail-page.component.html',
  styleUrls: ['./fail-page.component.styl']
})
export class FailPageComponent implements OnInit {


  status = "";

  constructor( private router : Router,private ics : RpIntercomService) {
    router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.router.navigate(['home',this.ics.id]);
      }
    });
  } 
  ngOnInit(): void {
    this.status = "Security Violation";
  }
  // @HostListener('window:popstate')
  // onPopState() {
  //   this.router.navigate(['home',this.ics.id]);
  // }

}
