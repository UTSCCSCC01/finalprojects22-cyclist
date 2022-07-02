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
  repeat = false;
  Su = false;
  Mo = false;
  Tu = false;
  We = false;
  Th = false;
  Fr = false;
  Sa = false;
  
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

  setRepeatFrequency() {
    if (this.form.value.dayWeekMonth === 'week') {
      let res = "";
      let t = [this.Su, this.Mo, this.Tu, this.We, this.Th, this.Fr, this.Sa];
      for (let i = 1; i < 8; i++) {
        if (t[i-1]) res += i;
      }
      this.form.value.frequency = res;
      // console.log(res);
    } else if (this.form.value.dayWeekMonth === 'month') {
      this.form.value.frequency = this.form.value.dueDate.slice(8,10);
    } else if (this.form.value.dayWeekMonth === 'day') {
      this.form.value.frequency = this.form.value.frequency.toString();
    }

    console.log(this.form.value.frequency);
  }

  repeatCheck(event: any) {
    this.repeat = event.target.checked;
    this.form.value.frequency = [null];
    this.form.value.dayWeekMonth = [null];
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

    isRepeat: [null],         // maybe just repeat true of false
    frequency: [null],
    dayWeekMonth: [null],   // add year?
    // repeatStartDay: [null],     // only in backend

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
    // set frequency
    this.setRepeatFrequency();
    if (this.form.value.name === null || this.form.value.dueDate === null || 
      this.form.value.dueTime === null || this.form.value.frequency.length === 0) {
      return;
    };
    this.formActive = false;
    console.log(this.form.value);
    // send data to back end
    await this.globals.createTask(this.form);
    // get all tasks from backend again
    // GlobalsService.getDailyTasks(3, 6, 2022);
    this.globals.getAllTasks("");
    this.form.reset();
  }

}
