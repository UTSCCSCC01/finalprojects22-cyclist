import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [GlobalsService]
})
export class DashboardComponent implements OnInit {
  globals: GlobalsService;
  
  constructor(globals: GlobalsService) {
    this.globals = globals;
  }
  
  ngOnInit(): void {
    // this.app.getTasks();
    this.globals.getDailyTasks(3, 6, 2022);
  }

}
