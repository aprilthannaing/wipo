import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs';
declare var CryptoJS: any;
@Injectable()
export class RpIntercomService {
    private _rpbeanSource = new Subject<any>();
    rpbean$ = this._rpbeanSource.asObservable();
    _title = "WIPO Filling";
    sessionid: string = "";
    userid: string = "";  
    orderid: string = "28";
    version: string = ""; 
    private _mybean: any;
    transRef: string = "";
    merDqrCode: string = "";    
    _apiurl = "http://localhost:8082";
    _cbpayurl = "https://122.248.120.187:4443";
}