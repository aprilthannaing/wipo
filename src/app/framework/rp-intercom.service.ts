
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var CryptoJS: any;

@Injectable()
export class RpIntercomService {
    private _rpbeanSource = new Subject<any>();
    rpbean$ = this._rpbeanSource.asObservable();
    _title = "WIPO Filling";
    sessionid: string = "";
    mpsgsessionid: string = "";
    orderid = "";
    userid: string = "";
    version: string = "";
    private _mybean: any;
    transRef: string = "";
    merDqrCode: string = "";
    _returnurl = "";
    serviceFees = 300;

    userObj = {
        "requestorId": "",
        "totalAmount": "",
        "paymentReference": ""
    };

    // _clienturl =  "https://ipdpayment.cbbank.com.mm/wipo";  
    // _apiurl     = "https://ipdpayment.cbbank.com.mm/payment";

    _clienturl = "http://localhost:4201";
    _apiurl = "http://localhost:8082";

    _cbpayurl = "https://103.150.78.103:4443";
    _visaurl = "https://cbbank.gateway.mastercard.com";
    _mpuurl = "https://122.248.120.252:60145";

    callback_url = "https://efiling.ipd.gov.mm/demo/success/CB";

    constructor(
        private http: HttpClient,
    ) { }

    setPaymentStatus(json) {
        const url: string = this._apiurl + "/payments/paymentStatus";
        this.http.post(url, json).subscribe((data: any) => {
            console.log("data  : ", data)
        },
            error => {
                console.warn('error', error);
            },
        );
    }

    callBack(paymentReference) {
        const json = {
            "paymentReference": paymentReference,
        }
        const url: string = this._apiurl + "/operation/saveVisa";
        this.http.post(url, json).subscribe(
            (data: any) => {
                console.log("call back !!!!!!!!!!!!!!!!!", data)
            },
            error => {
                console.warn("error: ", error);
            });
    }
}