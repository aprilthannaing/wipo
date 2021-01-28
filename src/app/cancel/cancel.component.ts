import { Component, OnInit } from '@angular/core';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { Router, ActivatedRoute, ParamMap, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.styl']
})
export class CancelComponent implements OnInit {

  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private ics: RpIntercomService,
    private router: Router,

  ) {

    this.route.paramMap.subscribe((params: ParamMap) => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params.get('id');
      console.log("this.ics.sessionid .....", this.ics.sessionid)
    })

    this.route.params.subscribe(params => {
      if (this.ics.sessionid == "" || this.ics.sessionid == null)
        this.ics.sessionid = params["id"]; 
      console.log("this.ics.sessionid .....", this.ics.sessionid)
    })
  }

  ngOnInit(): void {
    this.cancelPayment();

  }

  cancelPayment() {
    console.log("cancelling !!!!!!!!!!!" + this.ics.sessionid)
    this.router.navigate(['home',this.ics.sessionid]);
    const json = {
      "sessionId" : this.ics.sessionid,
      "paymentStatus" : "-1",
    }

    this.ics.setPaymentStatus(json);

    //payment status -1 update session 
  }

}
