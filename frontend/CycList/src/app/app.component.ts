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

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {
    this.globals.setAppTime();
  }
}
