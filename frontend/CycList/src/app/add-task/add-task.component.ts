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

  constructor(
    private fb: FormBuilder,
    public globals: GlobalsService
    ) {
  }

  ngOnInit(): void {
  }

  addTaskForm() {
    this.globals.formReset();
    this.globals.taskFormActive = true;
  }

  overlay() {
    this.globals.taskFormActive = false;
  }

  setRepeatFrequency() {
    if (this.globals.form.value.dayWeekMonth === 'week') {
      let res = "";
      for (let i = 1; i < 8; i++) {
        if (this.globals.taskFormWeek[i-1]) res += i;
      }
      this.globals.form.patchValue({
        frequency: res
      });
    } else if (this.globals.form.value.dayWeekMonth === 'month') {
      this.globals.form.patchValue({
        frequency: this.globals.form.value.tempDueDate.slice(8,10)
      });
    } else if (this.globals.form.value.dayWeekMonth === 'day') {
      this.globals.form.patchValue({
        frequency: this.globals.form.value.frequency.toString()
      });
    }
  }

  setDueTime() {
    if (this.globals.form.value.schedule) {
      this.globals.form.patchValue({
        dueDate: this.globals.form.value.tempDueDate
      });
    } else {
      this.globals.form.patchValue({
        dueDate: this.globals.form.value.tempDueMonth,
        dueTime: null
      });
    }
  }

  async submitForm() {
    console.log(this.globals.form.value);
    if (!this.globals.form.value.name ||
        this.globals.form.value.schedule && !this.globals.form.value.tempDueDate || 
        !this.globals.form.value.schedule && !this.globals.form.value.tempDueMonth ||
        this.globals.form.value.isRepeat && (
          !this.globals.form.value.schedule ||
          !this.globals.form.value.dayWeekMonth || 
          (this.globals.form.value.dayWeekMonth === 'day' && this.globals.form.value.frequency === 0)
          )
        ) {
      return;
    };
    this.setRepeatFrequency();
    this.setDueTime();

    this.globals.taskFormActive = false;
    // console.log(this.globals.form.value);
    // send data to back end
    await this.globals.createModifyTask(this.globals.form.value);
    this.globals.formReset();
  }

}
