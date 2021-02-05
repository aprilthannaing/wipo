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
  sessionid = "";
  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private ics: RpIntercomService) {
  }
  ngOnInit(): void {  
    this.route.params.subscribe(params => {
      this.sessionid = params["id"];
      this.checkUser(this.sessionid);
    }) 
  }

  generate() {
    const json = {
      "sessionId": this.sessionid,
    }

    this.ics.setConfirmationDate(json);
    this.router.navigate(['visa']);
  }

  cancel() {
    this.router.navigate(['home', this.sessionid]);
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
