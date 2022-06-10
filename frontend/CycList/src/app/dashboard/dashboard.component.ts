import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [GlobalsService]
})
export class DashboardComponent implements OnInit {
  // globals: GlobalsService;
  tasks;
  
  constructor(
    // globals: GlobalsService
    ) {
    // this.globals = globals;
    this.tasks = GlobalsService.getTasks();
  }
  
  ngOnInit(): void {
    // this.app.getTasks();
    // GlobalsService.getDailyTasks(3, 6, 2022);
    GlobalsService.getAllTasks("");
    // refresh to get show new tasks
    setInterval(() => { this.tasks = GlobalsService.getTasks(); console.log("refresh");}, 500);
  }

  refreshTasks() {
  }
  
}
