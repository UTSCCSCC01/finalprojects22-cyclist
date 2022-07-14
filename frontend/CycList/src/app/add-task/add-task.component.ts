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
  schedule = false;

  constructor(
    private fb: FormBuilder,
    public globals: GlobalsService
    ) {
  }

  ngOnInit(): void {
  }
  
  formReset() {
    this.repeat = false;
    this.Su = false;
    this.Mo = false;
    this.Tu = false;
    this.We = false;
    this.Th = false;
    this.Fr = false;
    this.Sa = false;
    this.form.reset();
    this.form.patchValue({
      frequency: "",
      isRepeat: false,  
      tagID: "",
    });
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
      let t = [this.Mo, this.Tu, this.We, this.Th, this.Fr, this.Sa, this.Su];
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
  }

  setDueTime() {
    if (this.schedule) {
      this.form.patchValue({
        dueDate: this.form.value.tempDueDate
      });
    } else {
      this.form.patchValue({
        dueDate: this.form.value.tempDueMonth,
        dueTime: [null]
      });
    }
  }

  repeatCheck(event: any) {
    this.repeat = event.target.checked;
    this.form.patchValue({
      frequency: "",
      dayWeekMonth: [null],
    });
    // console.log(this.form.value);
  }
  // @ViewChild("addTask") addTask: ElementRef<HTMLElement>;

  form: FormGroup = this.fb.group({
    name: [null],
    description: [null],
    signifier: [null],          // maybe just call it type????????
    content: [null],
    tempDueMonth: [null],      // temps for me to get info
    tempDueDate: [null],
    dueDate: [null],
    dueTime: [null],
    startDate: [null],
    startTime: [null],

    expectedDuration: [null],  // pointless because we have start and due/end unless this is an AI value

    isRepeat: false,         // maybe just repeat true of false
    frequency: "",
    dayWeekMonth: [null],   // add year?
    // repeatStartDay: [null],     // only in backend

    tagID: "",                // maybe just call tag, group, was this what was meant????????
    priority: [null],         // maybe like options: ! !! or !!!    
    mood: [null],
    location: [null],
    interests: [null],        // ?????????

    reminders: [null],      // TODO: need to be able to have multiple so maybe an array of 
    collaborations: [null]  // TODO: add friends that you will do that job with

                            // Ideas: file (image), url
  });

  async submitForm() {
    this.setRepeatFrequency();
    this.setDueTime();
    if (!this.form.value.name ||
        this.schedule && !this.form.value.tempDueDate || 
        !this.schedule && !this.form.value.tempDueMonth || 
        this.repeat && (!this.form.value.dayWeekMonth || this.form.value.frequency.length === 0)) {
      return;
    };

    this.formActive = false;
    console.log(this.form);
    // send data to back end
    await this.globals.createTask(this.form.value);
    this.formReset();
  }

}
