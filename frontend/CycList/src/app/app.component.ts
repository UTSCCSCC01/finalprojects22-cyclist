import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GlobalsService } from './globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CycList';

  constructor(public globals: GlobalsService) {
    if(Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  ngOnInit(): void {
    this.globals.setAppTime();
    // const options = {
    //   body: "other",
    //   icon: "../assets/list.png"
    // }
    // let notification = new Notification('Send Notification!', options);
  }
}
