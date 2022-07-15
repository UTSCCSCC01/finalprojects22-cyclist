import { Component, OnInit, Input } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() 
  _id: string = "";

  @Input() 
  name: string = "";

  @Input() 
  content: string = "";

  @Input() 
  schedule: string = "";

  @Input() 
  dueTime: string = "";

  @Input() 
  isRepeat: string = "";

  @Input() 
  tag: string = "";

  @Input()
  color: string = "";

  @Input()
  dayWeekMonth: string = "";

  @Input() 
  dueDate: string = "";

  @Input() 
  frequency: string = "";

  // vvv Signifiers: completed, important, abandoned
  @Input()
  completed: Boolean = false;

  @Input()
  important: Boolean = false;

  @Input()
  abandoned: Boolean = false;

  sigMenuOpened : Boolean = false;

  toggleSigMenu() {
    this.sigMenuOpened = !this.sigMenuOpened;
  }

  toggleSigCompleted() {
    this.completed = !this.completed;
    this.globals.markSignifier(this.id, this.important, this.completed, this.abandoned);
  }

  toggleSigImportant() {
    this.important = !this.important;
    this.globals.markSignifier(this.id, this.important, this.completed, this.abandoned);
  }
  
  toggleSigAbandoned() {
    this.abandoned = !this.abandoned;
    this.globals.markSignifier(this.id, this.important, this.completed, this.abandoned);
  }


  constructor(public globals: GlobalsService) { 
    // this.tags = this.globals.getTags();
    // this.taskTag = GlobalsService.getTag(this.tagID);
    
    // if (this.tagID) {
    //   GlobalsService.getTag(this.tagID);
    //   this.taskTag = GlobalsService.getTags();

    //   console.log("TASK TAG")
    //   console.log(this.taskTag);
    //   console.log("END TASK TAG")
    // } 

    // set timeout for notification
    // TODO: add task dueTime and dueDate
    // TODO: add notifications
    // TODO: add tags and class=tag.color
    // time = this.year
    // setTimeout(function(){alert("It's 10am!")}, (new Date('2022-07-05 22:14'))-(new Date()))

  }
  // constructor(private dailyView: DailyViewComponent) { }


  ngOnInit(): void {
  }

  addTaskForm() {
    // make sure form is cleared before editing
    this.globals.formReset();
    this.globals.form.patchValue({_id: this._id});
    this.globals.form.patchValue({name: this.name});
    this.globals.form.patchValue({schedule: this.schedule});
    this.globals.form.patchValue({dueTime: this.dueTime});
    this.globals.form.patchValue({isRepeat: this.isRepeat});
    this.globals.form.patchValue({tagID: this.tag});
    this.globals.form.patchValue({color: this.color});
    this.globals.form.patchValue({dayWeekMonth: this.dayWeekMonth});
    
    if(this.schedule){
      this.globals.form.patchValue({tempDueDate: this.dueDate});
    }else{
      this.globals.form.patchValue({tempDueMonth: this.dueDate});
    }
    
    //testing below
    //this.globals.form.patchValue({isRepeat: true});
    //this.frequency = "136";
    //this.globals.form.patchValue({dayWeekMonth: 'week'});
    //this.dayWeekMonth = 'week'

    if(this.dayWeekMonth === 'day'){
      this.globals.form.patchValue({frequency: parseInt(this.frequency)});
    }else if(this.dayWeekMonth === 'week'){
      for (let i = 0; i < this.frequency.length; i++) {
        this.globals.taskFormWeek[parseInt((this.frequency)[i])-1] = true;
        // console.log(((this.frequency)[i]));
      }
    }

    // console.log(this.globals.form.value);
    // console.log(this.globals.taskFormWeek);
    this.globals.taskFormActive = true;

    // load directly:
      // _id
      // name
      // content
      // schedule
      // dueTime
      // isRepeat
      // tag   => tagID
      // color
      // dayWeekMonth

    // parse:
      // dueDate  => tempDueDate if schedule is true, else => tempDueMonth
      // frequency  => 
        // if dayWeekMonth is
          // null or 'month' => do nothing
          // 'week' => parse string into taskFormWeek array
          // 'day' => put int value into frequency

  }

  deleteTask() {
    this.globals.deleteTask(this._id);
  }
  
}
