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
    // this.taskTag = GlobalsService.getTag(this.tagID);
    
    // if (this.tagID) {
    //   GlobalsService.getTag(this.tagID);
    //   this.taskTag = GlobalsService.getTags();

    //   console.log("TASK TAG")
    //   console.log(this.taskTag);
    //   console.log("END TASK TAG")
    // } 

  }
  // constructor(private dailyView: DailyViewComponent) { }


  ngOnInit(): void {

    // if (this.tagID) {
    //   GlobalsService.getTag(this.tagID);
    //   this.taskTag = GlobalsService.getTags();

    //   console.log("TASK TAG")
    //   console.log(this.taskTag);
    //   console.log("END TASK TAG")
    // } 
    // this.taskTag = GlobalsService.getTags();


    // setInterval(() => { 
      GlobalsService.getAllTags("aa");
      this.tags = GlobalsService.getTags(); 
      // console.log("refresh");
    // }, 3000);


    // setInterval(() => { 
    //   this.taskTag = GlobalsService.getTag(this.tagID);
    //   // this.taskTag = GlobalsService.getTags();
    //   // console.log("TASK TAG")
    //   // console.log(this.taskTag)

    //   // this.taskTag = this.taskTag.filter(tag => tag._id == this.tagID);
    //   // console.log("refresh");
    // }, 3000);




    // if (this.tagID) {
    //   this.taskTag = GlobalsService.getTag(this.tagID);
    //   console.log(this.taskTag);
    // }

    // console.log("TAG " + this.tagID);

    // if (this.tagID) {
    //   GlobalsService.getTag(this.tagID);
    //   this.taskTag = GlobalsService.getTags();

    //   console.log("TASK TAG")
    //   console.log(this.taskTag);
    //   console.log("END TASK TAG")
    // } 
  }

}
