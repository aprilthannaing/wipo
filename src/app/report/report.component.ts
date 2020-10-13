import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.styl']
})
export class ReportComponent implements OnInit {

  constructor() {
    this.visaReport();
   }

  ngOnInit(): void {
  }

  visaReport(){
    window.open("http://localhost:8081/report/visa.xlsx", "_blank");

  }

}
