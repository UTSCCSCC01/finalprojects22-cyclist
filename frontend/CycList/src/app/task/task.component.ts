import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  @Input() 
  name: string = "";

  @Input() 
  startTime: string = "";

  @Input() 
  year: string = "";

  @Input() 
  month: string = "";

  @Input() 
  day: string = "";

  constructor() { }
  // constructor(private dailyView: DailyViewComponent) { }


  ngOnInit(): void {
  }

}
