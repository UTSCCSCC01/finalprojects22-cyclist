import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})
export class DailyLogComponent implements OnInit {

  dailyTasks : any[] = [];
  numDates = 6;   // TODO: dependency injection!?
  dates : Date[] = [];

  constructor(public globals: GlobalsService) {}

  ngOnInit(): void {
    //this.globals.resetTasks();

    //get the upcomming `this.numDates` dates
    let today = new Date();
    
    for (let i = 0; i < this.numDates; i++) {
      this.dates[i] = new Date();
      this.dates[i].setDate(today.getDate() + i);
    }

    //get each day's tasks
    for(let i = 0; i < this.numDates; i++) {
      this.globals.getDailyTasks(this.dates[i].getDate(), this.dates[i].getMonth() + 1, this.dates[i].getFullYear());
      //console.log(this.globals.tasks);

      this.dailyTasks[i] = this.globals.getTasks();
      console.log(this.dailyTasks[i]);
    }
    
  }

}
