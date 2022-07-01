import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  tags;

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

  @Input()
  tagID: string = "";

  constructor() { 
    this.tags = GlobalsService.getTags();
  }
  // constructor(private dailyView: DailyViewComponent) { }


  ngOnInit(): void {
    // console.log();
    GlobalsService.getAllTags(this.tagID);
    this.tags = GlobalsService.getTags();
  }

}
