import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front-end-redirect',
  templateUrl: './front-end-redirect.component.html',
  styleUrls: ['./front-end-redirect.component.styl']
})
export class FrontEndRedirectComponent implements OnInit {
    merchantID = "";
    respCode = "";
    pan = "";
    amount = "";
    invoiceNo = "";
    tranRef = "";
    approvalCode = "";
    dateTime  = "";
    status = "";
    failReason = "";
    userDefined1 = "";
    userDefined2 = "";
    categoryCode = "";
    hashValue = "";

  constructor() { }

  ngOnInit(): void {
  }

}
