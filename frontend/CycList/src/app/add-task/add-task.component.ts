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
  globals: GlobalsService;
  
  constructor(
    globals: GlobalsService,
    private fb: FormBuilder
    ) {
    this.globals = globals;
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

  submitForm() {
    if (this.form.value.name === null || this.form.value.dueDate === null || this.form.value.dueTime === null ) {
      return;
    };
    this.formActive = false;
    console.log(this.form.value)
    // send data to back end
    this.globals.createTask(this.form);
    // get all tasks from backend again
    // this.globals.getDailyTasks(3, 6, 2022);
    this.globals.getAllTasks("");
    // BUG: since it doesn't update the interface just manually push it to UI for now:
    const newTask = {
      content: this.form.value.content,
      name: this.form.value.name,
      day: this.form.value.dueDate.slice(0,4),
      month: this.form.value.dueDate.slice(5,7),
      year: this.form.value.dueDate.slice(8,10),
      startTime: this.form.value.startTime
    };
    this.globals.tasks.push(newTask);

    this.form.reset();
  }

}
