import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';

@Component({
  selector: 'app-forwarder-guard',
  templateUrl: './forwarder-guard.component.html',
  styleUrls: ['./forwarder-guard.component.styl']
})
@Injectable()
export class ForwarderGuardComponent implements CanActivate  {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    this.router.navigate([`home/${route.params['id']}`]);
    return false;
  }
}
