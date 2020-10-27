import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ParamMap  } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { tap, map} from 'rxjs/operators'
@Component({
  selector: 'app-confirm',
  templateUrl: './qr-confirm.component.html',
  styleUrls: ['./qr-confirm.component.styl']
})
export class ConfirmComponent implements OnInit {
  loading_ = false;
  id = "";
  request = {"merId":"", "transRef":""};  
  resObj:any = this.Objfun();
  qrString = "";
  amount:number;currency = "";

  Objfun(){
    return { 
      //"reqId":"","merId":"","subMerId":"","terminalId":"", "transAmount":"", "transCurrency":"","ref1":"", "ref2":"",
      "code" : "","msg" : "","merDqrCode" : "","transExpiredTime" : "","refNo" : "","transRef" : ""};
  }
  
  constructor(private http : HttpClient, 
    private location : Location,
    private router : Router,
    private route : ActivatedRoute,
    private ics : RpIntercomService) { 
  }
  sub: any;
  ngOnInit(): void {   
    if(this.ics.sessionid != "" || this.ics.sessionid != null)  
        this.checkUser(this.ics.sessionid);
      else console.log("Session ID is not null or empty"); 
  }
  
    cancel(){
      this.router.navigate(['home',this.ics.sessionid]);
    }
    generate(){
      this.loading_ = true;
      const url: string =  "/payment-api/v1/qr/generate-transaction.service"; 
        this.resObj.reqId =  "2d21a5715c034efb7e0aa383b885fc7a";
        this.resObj.merId = "581500000000017";
        this.resObj.subMerId = "0000000001700001";
        this.resObj.terminalId = "03000001";
        this.resObj.transAmount = this.amount + 500;
        this.resObj.transCurrency =  "MMK";
        this.resObj.ref1 = "9592353534";
        this.resObj.ref2 = "1004355346";
        const body = JSON.stringify(this.resObj);
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
       // headers = headers.append('Authen-Token', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTY3NzU2NzIsIm1lcklkIjoiNTgxNTAwMDAwMDAwMDE3In0.hO4-eWFQHM5STCydXlwr2SjghmFe_4GgmccBq3vJvUY");
        this.http.post(url,this.resObj,{headers:headers}).subscribe((data:any)=> {
          if(data.code == '0000'){
            this.loading_ = false;
            this.resObj.merDqrCode = data.merDqrCode;
            this.ics.transRef = data.transRef;
            this.ics.merDqrCode = data.merDqrCode;
            this.router.navigate(['qrcode']);
            this.save(data);
          }else{
            console.warn("fail: " , data);
          }
        },
        error => {   
          console.warn('error' , error);             
       },
       );
    }

    save(obj){
      const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
      this.resObj.code = obj.code;
      this.resObj.msg = obj.msg;
      this.resObj.merDqrCode= obj.merDqrCode;
      this.resObj.refNo= obj.refNo;
      this.resObj.transExpiredTime= obj.transExpiredTime;
      this.resObj.transRef= obj.transRef;
      const url: string = "/operation/saveCBPaytransaction";
      this.http.post(url, JSON.stringify(this.resObj), {headers: headers}).subscribe(
        (data:any)=> {
         console.log("Save_____" + data);
        },
        error => {
            console.warn('error_____ ' , error);             
        },
      );
    }

    checkUser(id){
      const url: string = "/data/check"; 
      const json = {
        id : id
      }
      this.http.post(url,json).subscribe((data:any)=> {
          if(data.code == "0000"){
            this.amount =+ data.userObj.amount;
            this.currency = data.userObj.currency;
          }else this.router.navigate(['fail']);
        },
        error => {   
          console.warn('error' , error);             
        }, 
      ); 
    }

  }
 


 


