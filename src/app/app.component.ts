import { Component } from '@angular/core';
import { RpIntercomService } from './framework/rp-intercom.service';
import { Title } from '@angular/platform-browser';
declare var jQuery: any;

interface DialogData {
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {

}
