import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // globals: GlobalsService;
  // tasks;
  
  constructor(
    public globals: GlobalsService
    ) {
    // this.globals = globals;
    // this.tasks = this.globals.getTasks();
  }
  
  ngOnInit(): void {
    // this.app.getTasks();
    // GlobalsService.getDailyTasks(3, 6, 2022);
    this.globals.getAllTasks("");
    // refresh to get show new tasks
    // setInterval(() => {
    //   this.tasks = this.globals.getTasks(); 
    //   // console.log("refresh");
    // }, 500);
  }

  // getTasks() {
  //   return this.globals.getTasks();
  // }

}
