import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-future-log',
  templateUrl: './future-log.component.html',
  styleUrls: ['./future-log.component.scss']
})
export class FutureLogComponent implements OnInit {
  tasks;
  
  constructor(
    // globals: GlobalsService
    ) {
    this.tasks = GlobalsService.getTasks();
  }
  
  ngOnInit(): void {
    // this.app.getTasks();
    // GlobalsService.getDailyTasks(3, 6, 2022);
    GlobalsService.getAllTasks("");
    // refresh to get show new tasks
    setInterval(() => { 
      this.tasks = GlobalsService.getTasks(); 
      // console.log("refresh");
    }, 500);
  }

  refreshTasks() {
  }

}
