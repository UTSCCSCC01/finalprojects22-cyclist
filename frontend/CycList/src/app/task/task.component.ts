import { Component, OnInit } from '@angular/core';
import { DailyViewComponent } from '../daily-view/daily-view.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private dailyView: DailyViewComponent) { }


  ngOnInit(): void {
    // console.log();
  }

}
