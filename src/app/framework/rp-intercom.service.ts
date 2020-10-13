import {Injectable} from '@angular/core';
import {Subject}    from 'rxjs';
declare var jQuery: any;
@Injectable()
export class RpIntercomService {
    id : string = "";
    sessionid: string = "";  
    orderid: string = "24";
    version: string = ""; 
    private _mybean: any;
    transRef: string = "";
    merDqrCode: string = "";    
    _apiurl = ""; //http://localhost:8080
    _cbpayurl = "/payment-api/v1/qr/"; //https://122.248.120.187:4443
    visaurl = "https://cbbank.gateway.mastercard.com";
    private _rpbeanSource = new Subject<any>();
    sendBean(x: any) {
        this._mybean = x;
        this._rpbeanSource.next(x);
    }
}