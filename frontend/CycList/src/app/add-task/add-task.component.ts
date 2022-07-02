import { Component, ElementRef, INJECTOR, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  formActive = false;
  
  constructor(
    private fb: FormBuilder,
    public globals: GlobalsService
    ) {
  }

  ngOnInit(): void {
  }

  addTaskForm() {
    this.formActive = true;
  }

  overlay() {
    this.formActive = false;
  }

  // @ViewChild("addTask") addTask: ElementRef<HTMLElement>;

  form: FormGroup = this.fb.group({
    name: [null],
    description: [null],
    signifier: [null],          // maybe just call it type????????
    content: [null],
    dueDate: [null],            // please merge     day: Int month: Int year: Int
    dueTime: [null],
    startDate: [null],
    startTime: [null],

    expectedDuration: [null],  // pointless because we have start and due/end unless this is an AI value

    repeat: [null],         // maybe just repeat true of false
    frequency: [null],
    dayWeekMonthYear: [null],   // add year?
    repeatStartDay: [null],     // pointless????????

    group: [null],                // maybe just call tag, group, was this what was meant????????
    priority: [null],         // maybe like options: ! !! or !!!    
    mood: [null],
    location: [null],
    interests: [null],        // ?????????

    reminders: [null],      // TODO: need to be able to have multiple so maybe an array of 
    collaborations: [null]  // TODO: add friends that you will do that job with

                            // Ideas: file (image), url
  });

  async submitForm() {
    if (this.form.value.name === null || this.form.value.dueDate === null || this.form.value.dueTime === null ) {
      return;
    };
    this.formActive = false;
    console.log(this.form.value);
    // send data to back end
    await this.globals.createTask(this.form);
    this.form.reset();
  }

}
