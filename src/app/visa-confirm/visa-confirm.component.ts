import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';


@Component({
  selector: 'app-visa-confirm',
  templateUrl: './visa-confirm.component.html',
  styleUrls: ['./visa-confirm.component.styl']
})
export class VisaConfirmComponent implements OnInit {

  constructor(
    private router: Router,
    private ics: RpIntercomService) { }

  ngOnInit(): void {
  }

  generate() {
    this.router.navigate(['visa']);
  }

  cancel() {
    this.router.navigate(['home', this.ics.sessionid]);
  }

}
