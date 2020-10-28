import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';


@Component({
  selector: 'app-mpsg-confirm',
  templateUrl: './mpsg-confirm.component.html',
  styleUrls: ['./mpsg-confirm.component.styl']
})
export class MpsgConfirmComponent implements OnInit {

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
