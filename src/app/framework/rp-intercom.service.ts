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
    _clienturl  = "http://localhost:4200/wipo";    
    _apiurl     = "http://localhost:8080/payment";
    _cbpayurl   = "https://103.150.78.103:4443";
    _visaurl    = "https://cbbank.gateway.mastercard.com";
    _mpuurl     = "https://122.248.120.252:60145";
}