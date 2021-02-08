import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { SuccessPageComponent } from '../success-page/success-page.component';
import { filter } from 'rxjs/operators';
import { RpIntercomService } from '../framework/rp-intercom.service';

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
  dateTime = "";
  status = "";
  failReason = "";
  userDefined1 = "";
  userDefined2 = "";
  userDefined3 = "";
  categoryCode = "";
  hashValue = "";


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,

    private location: Location,
    private ics: RpIntercomService,
  ) { }

  ngOnInit(): void {
    console.log("session id !!!!!!!!", this.ics.sessionid )
    console.log("front end redirect  !!!!!!!!!!!!!!!")
    console.log(" merchantID !!!!!!!!", this.merchantID)
    console.log(" respCode !!!!!!!!", this.respCode)
    console.log(" pan !!!!!!!!", this.pan)
    console.log(" amount !!!!!!!!", this.amount)
    console.log(" invoiceNo !!!!!!!!", this.invoiceNo)
    console.log(" tranRef !!!!!!!!", this.tranRef)
    console.log(" approvalCode !!!!!!!!", this.approvalCode)
    console.log(" dateTime !!!!!!!!", this.dateTime)


  }
  // formData = new FormData();
  // onSubmit() {
  //   console.log("On submit working..................");
  //   this.formData.append('merchantID', this.merchantID);
  //   this.formData.append('respCode', this.respCode);
  //   this.formData.append('pan', this.pan);
  //   this.formData.append('amount', this.amount);
  //   this.formData.append('invoiceNo', this.invoiceNo);
  //   this.formData.append('tranRef', this.tranRef);
  //   this.formData.append('approvalCode', this.approvalCode);
  //   this.formData.append('dateTime', this.dateTime);
  //   this.formData.append('status', this.status);
  //   this.formData.append('failReason', this.failReason);
  //   this.formData.append('userDefined1', this.userDefined1);
  //   this.formData.append('userDefined2', this.userDefined2);
  //   this.formData.append('userDefined3', this.userDefined3);
  //   this.formData.append('categoryCode', this.categoryCode);
  //   this.formData.append('hashValue', this.hashValue);
  //   this.http.post("https://ipdpayment.cbbank.com.mm/wipo/", this.formData).subscribe(
  //     (res) => {
  //       console.log("Redirect Response__________" + res);
  //       console.log("", this.formData);
  //     },
  //     (err) => console.log("REgirect Error_____________" + err)
      
  //   );
  // }
}
