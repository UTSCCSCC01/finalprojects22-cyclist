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

  constructor() {
    GlobalsService.getDailyTasks(1, 7, 2022);
  }

  ngOnInit(): void {

    //get the upcomming `this.numDates` dates
    let today = new Date();
    
    for (let i = 0; i < this.numDates; i++) {
      this.dates[i] = new Date();
      this.dates[i].setDate(today.getDate() + i);
    }

    //get each day's tasks, update every 500ms
    setInterval(() => { 
      for(let i = 0; i < this.numDates; i++) {
        GlobalsService.getDailyTasks(this.dates[i].getDate(), this.dates[i].getMonth() + 1, this.dates[i].getFullYear());
        let tasks = GlobalsService.getTasks(); 
        this.dailyTasks[i] = tasks;
      }
    }, 500);
    
  }

}
