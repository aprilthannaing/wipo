import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-front-end-redirect',
  templateUrl: './front-end-redirect.component.html',
  styleUrls: ['./front-end-redirect.component.styl']
})
export class FrontEndRedirectComponent implements OnInit {
  merchantID = "";
  respCode = "00";
  pan = "";
  amount = "";
  invoiceNo = "";
  tranRef = "";
  approvalCode = "";
  dateTime = "";
  status = "AP";
  failReason = "Approved";
  userDefined1 = "";
  userDefined2 = "";
  categoryCode = "";
  hashValue = "";

  //{
  //"merchantID":"206104000003467",
  //"respCode":"00",
  //"pan":"950319xxxxxx6549",
  //"amount":"000000020000",
  //"invoiceNo":"1598606019873622",
  //"tranRef":"4067076",
  //"approvalCode":"9XR32H",
  //"dateTime":"20200828154547",
  //"status":"AP",
  //"failReason":"Approved",
  //"userDefined1":"100","
  //userDefined2":"2","userDefined3":null,
  //"categoryCode":null,
  //"hashValue":"CEF862727401D0A5BC0B1E8ED684A6C72E695F8B"
  //}

  constructor(
    private router: Router,
  ) {
    this.checkStatus();
  }

  ngOnInit(): void {
  }
  checkStatus() {
    if (this.respCode == "00") {
      this.router.navigate(['success']);
    } else {
      this.router.navigate(['fail']);
    }
  }
}
