import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router} from '@angular/router';
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
    url =  "";
    merchantID:any
    respCode:any
    pan:any
    amount:any
    invoiceNo:any
    tranRef:any
    approvalCode :any
    dateTime:any
    status:any
    failReason:any
    userDefined1:any
    userDefined2:any
    categoryCode:any
    hashValue:any
    userDefined3:any

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location,
    private ics:RpIntercomService
    ) {
      this.url = this.ics._clienturl;
    console.log(" Calling Front End Redirect Constructor...........");
		console.log(" merchantID " + this.merchantID);
		console.log(" respCode " + this.respCode);
		console.log(" pan " + this.pan);
		console.log(" invoiceNo " + this.invoiceNo);
		console.log(" tranRef " + this.tranRef);
		console.log(" dateTime " + this.dateTime);
		console.log(" status " + this.status);
		console.log(" failReason " + this.failReason);
		console.log(" userDefined1 " + this.userDefined1);
		console.log(" userDefined2 " + this.userDefined2);
		console.log(" userDefined3 " + this.userDefined3);
		console.log(" categoryCode " + this.categoryCode);
		console.log(" hashValue " + this.hashValue);
		console.log(" amount " + this.amount);
     }
   ngOnInit(): void {
  //   const url: string = this.ics._apiurl + "/payments/ApOrNot";
  //   const json = {
  //     "status"   : this.status,
  //     "failReason" : this.failReason
  //   }
  //   this.http.post(url, json).subscribe((data: any) => {
  //     console.log("data: ", data)
  //     if (data.status == "Ap") {

  //       this.router.navigateByUrl('/success', {skipLocationChange: true});
  //       this.location.replaceState('/mpu/frontEndRedirect/success');
        
  //     }
  //     else this.fail();
  //   },
  //     error => {
  //       this.fail();
  //       console.warn('error', error);
  //     },
  //   );
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
