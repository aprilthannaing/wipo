import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fail-page',
  templateUrl: './fail-page.component.html',
  styleUrls: ['./fail-page.component.styl']
})
export class FailPageComponent implements OnInit {


  status = "";

  constructor() { }

  ngOnInit(): void {
    this.status = "Security Violation";
  }

}
