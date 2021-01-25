
import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs';
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
    _returnurl  = "";
     _clienturl  = "http://localhost:4200"; 
   // _clienturl =  "https://ipdpayment.cbbank.com.mm/wipo";  
    _apiurl     = "https://ipdpayment.cbbank.com.mm/payment";
    _cbpayurl   = "https://103.150.78.103:4443";
    _visaurl    = "https://cbbank.gateway.mastercard.com";
    _mpuurl     = "https://122.248.120.252:60145";
}