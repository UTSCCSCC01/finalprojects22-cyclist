import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-future-log',
  templateUrl: './future-log.component.html',
  styleUrls: ['./future-log.component.scss']
})
export class FutureLogComponent implements OnInit {
  
  constructor(
    public globals: GlobalsService
    ) {
    // this.tasks = GlobalsService.getTasks();
  }
  
  ngOnInit(): void {
    // this.app.getTasks();
    // GlobalsService.getDailyTasks(3, 6, 2022);
    // GlobalsService.getFutureTasks("");
    // refresh to get show new tasks

    // setInterval(() => { 
    this.globals.getFutureTasks(2022);
    //   this.tasks = this.globals.getTasks(); 
    //   // console.log("refresh");
    // }, 500);
  }

  refreshTasks() {
  }

}
