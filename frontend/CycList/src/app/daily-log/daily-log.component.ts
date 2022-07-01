import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})
export class DailyLogComponent implements OnInit {

  dailyTasks : any;
  numDates = 6;   // TODO: dependency injection!?
  dates : Date[] = [];

  constructor() {}

  ngOnInit(): void {

    //get the upcomming `this.numDates` dates
    let today = new Date();
    
    for (let i = 0; i < this.numDates; i++) {
      this.dates[i] = new Date();
      this.dates[i].setDate(today.getDate() + i);
    }

    // this.tasks = GlobalsService.getDailyTasks();

    let day1 = ["[test]1a", "[test]1b", "[test]1c", "[test]1d"];
    let day2 : string[] = [];
    let day3 = ["[test]1a"];
    let day4 = ["[test]1a", "[test]1d"];
    let day5 : string[] = [];
    let day6 : string[] = [];

    this.dailyTasks = [day1, day2, day3, day4, day5, day6];

    
  }

}
