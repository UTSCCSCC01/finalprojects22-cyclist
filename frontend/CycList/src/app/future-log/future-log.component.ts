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
    ) {
    this.tasks = GlobalsService.getTasks();
  }
  
  ngOnInit(): void {
    setInterval(() => { 
      GlobalsService.getFutureTasks(2022);
      this.tasks = GlobalsService.getTasks(); 
    }, 500);
  }

  refreshTasks() {
  }

}
