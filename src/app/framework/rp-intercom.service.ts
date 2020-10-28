import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs';
declare var CryptoJS: any;
@Injectable()
export class RpIntercomService {
    private _rpbeanSource = new Subject<any>();
    rpbean$ = this._rpbeanSource.asObservable();
    _title = "WIPO Filling";
    sessionid: string = "";
    orderid = "";
    userid: string = "";  
    version: string = ""; 
    private _mybean: any;
    transRef: string = "";
    merDqrCode: string = "";    
    _apiurl = "http://localhost:8082";
    _cbpayurl = "https://122.248.120.187:4443";
    _visaurl = "https://cbbank.gateway.mastercard.com";
    _mpuurl = "https://122.248.120.252:60145";
}