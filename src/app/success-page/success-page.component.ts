import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RpIntercomService } from '../framework/rp-intercom.service';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.styl']
})
export class SuccessPageComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private ics: RpIntercomService
  ) {
  }
  response = {"requestorId":"", "transactionId":"", "payerName":"", "payerPhone":"", "payerEmail":"", "totalAmount":""};
  ngOnInit(): void {
    //if(this.ics.sessionid != "" || this.ics.sessionid != null)  
     //   console.log("Session ID is not null or empty");
    //else 
        this.sessionOut();
  }

  sessionOut(){
    const url: string = "http://localhost:8080/payment/payments/sessionOut"; 
    const json = {
      //id : this.ics.sessionid
      id: "deb0a88c50653b8d0ca2905f694d5cf9"
    }
    this.http.post(url,json).subscribe((data:any)=> {
        if(data.code == "0000"){
          console.log(data.response)
          this.response.requestorId = data.response.requestorId;
          this.response.transactionId = data.response.transactionId;
          this.response.payerName = data.response.payerName;
          this.response.payerEmail = data.response.payerEmail;
          this.response.payerPhone = data.response.payerPhone;
          this.response.totalAmount = data.response.totalAmount;
          console.log(this.response.transactionId)
          console.log(data.description)
        }
        else {
          this.router.navigate(['fail']);
          console.log(data.description)
        }
      },
      error => { 
        this.router.navigate(['fail']);  
        console.warn('error' , error);             
      }, 
    ); 
  }

}
