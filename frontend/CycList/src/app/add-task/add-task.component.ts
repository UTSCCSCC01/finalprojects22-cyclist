import { Component, ElementRef, INJECTOR, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  //formActive = false;
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
    this.globals.form.reset();
    this.globals.form.patchValue({
      frequency: "",
      isRepeat: false,  
      tagID: "",
    });
  }

  addTaskForm() {
    this.globals.form.reset();
    this.globals.taskFormActive = true;
  }

  overlay() {
    this.globals.taskFormActive = false;
  }

  setRepeatFrequency() {
    if (this.globals.form.value.dayWeekMonth === 'week') {
      let res = "";
      let t = [this.Mo, this.Tu, this.We, this.Th, this.Fr, this.Sa, this.Su];
      for (let i = 1; i < 8; i++) {
        if (t[i-1]) res += i;
      }
      this.globals.form.value.frequency = res;
      // console.log(res);
    } else if (this.globals.form.value.dayWeekMonth === 'month') {
      this.globals.form.value.frequency = this.globals.form.value.dueDate.slice(8,10);
    } else if (this.globals.form.value.dayWeekMonth === 'day') {
      this.globals.form.value.frequency = this.globals.form.value.frequency.toString();
    }
  }

  setDueTime() {
    if (this.schedule) {
      this.globals.form.patchValue({
        dueDate: this.globals.form.value.tempDueDate
      });
    } else {
      this.globals.form.patchValue({
        dueDate: this.globals.form.value.tempDueMonth,
        dueTime: [null]
      });
    }
  }

  repeatCheck(event: any) {
    this.repeat = event.target.checked;
    this.globals.form.patchValue({
      frequency: "",
      dayWeekMonth: [null],
    });
    // console.log(this.form.value);
  }
  // @ViewChild("addTask") addTask: ElementRef<HTMLElement>;


  async submitForm() {
    this.setRepeatFrequency();
    this.setDueTime();
    if (!this.globals.form.value.name ||
        this.schedule && !this.globals.form.value.tempDueDate || 
        !this.schedule && !this.globals.form.value.tempDueMonth || 
        this.repeat && (!this.globals.form.value.dayWeekMonth || this.globals.form.value.frequency.length === 0)) {
      return;
    };

    this.globals.taskFormActive = false;
    console.log(this.globals.form.value);
    // send data to back end
    await this.globals.createTask(this.globals.form.value);
    this.formReset();
  }

}
