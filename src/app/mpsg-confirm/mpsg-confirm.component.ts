import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RpIntercomService } from '../framework/rp-intercom.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-mpsg-confirm',
  templateUrl: './mpsg-confirm.component.html',
  styleUrls: ['./mpsg-confirm.component.styl']
})
export class MpsgConfirmComponent implements OnInit {
  serviceCharges = "";
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private ics: RpIntercomService) {
  }
  ngOnInit(): void {   
    if(this.ics.sessionid == "" || this.ics.sessionid == null)  
      console.log("Session ID is not null or empty"); 
    else
      this.checkUser(this.ics.sessionid);
  }

  generate() {

    console.log("this.ics.sessionid !!!!!!!", this.ics.sessionid)
    const json = {
      "sessionId": this.ics.sessionid,
    }

    this.ics.setConfirmationDate(json);
    this.router.navigate(['visa']);
  }

  cancel() {
    this.router.navigate(['home', this.ics.sessionid]);
  }

  checkUser(id) {
    const url: string =this.ics._apiurl  +  "/payments/check";
    const json = {
      "id"   : id,
      "type" : "MPSG"
    }
    this.http.post(url, json).subscribe((data: any) => {
      if (data.code == "0000") {
          this.serviceCharges = data.userObj.serviceCharges;
      } else this.router.navigate(['fail']);
    },
      error => {
        console.warn('error', error);
      },
    );
  }

}
