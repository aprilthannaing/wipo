import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Route, Router} from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { SuccessPageComponent } from '../success-page/success-page.component';
import { filter } from 'rxjs/operators';

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


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location
    ) { }

  ngOnInit(): void {
    const url: string = "http://localhost:8080/payments/ApOrNot";
    const json = {
      "status"   : this.status,
      "failReason" : this.failReason
    }
    this.http.post(url, json).subscribe((data: any) => {
      console.log("data: ", data)
      if (data.status == "Ap") {

        // this.router.navigate(['mpu/frontEndRedirect/success']);
        this.router.navigateByUrl('/success', {skipLocationChange: true});
        this.location.replaceState('/mpu/frontEndRedirect/success');
        
      }
      else this.fail();
    },
      error => {
        this.fail();
        console.warn('error', error);
      },
    );
  }

  fail() {
    this.router.navigate(['fail']);
  }
}
