import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-visa-confirm',
  templateUrl: './visa-confirm.component.html',
  styleUrls: ['./visa-confirm.component.styl']
})
export class VisaConfirmComponent implements OnInit {

  constructor(  private router: Router,) { }

  ngOnInit(): void {
  }

  generate(){
    this.router.navigate(['visa']);

  }

}
