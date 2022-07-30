import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-monthly-log',
  templateUrl: './monthly-log.component.html',
  styleUrls: ['./monthly-log.component.scss'],
})
export class MonthlyLogComponent implements OnInit {
  month: number;
  monthName: string;
  allDaysInMonth: Date[];
  rowsInCalendar: number;
  prev_days: number[] = [];
  days: any[] = [];
  next_days: number[] = [];
  today: number = new Date().getDate();

  weekDaysName: string[];

  constructor(public globals: GlobalsService) {
    /***************/
    /*  Calendar   */
    /***************/
    const date = new Date();

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    this.days = Array(lastDay);
    for(let i = 0; i < lastDay; i++) {
      if(i === date.getDate()) {
        this.days[i] = `<div class="">${i + 1}</div>`;
      }
      else {
        this.days[i] = `<div>${i + 1}</div>`;
      }
    }

    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    for(let i = 0; i < firstDayIndex; i++) {
      this.prev_days[i] = (prevLastDay - firstDayIndex + 1) + i;
    }

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    for(let i = 0; i < 7 - lastDayIndex - 1; i++) {
      this.next_days[i] = (1 + lastDayIndex) + i;
    }

    console.log(this.today);
    console.log(firstDayIndex);
    console.log(lastDayIndex);
    console.log(this.prev_days);
    console.log(this.days);
    console.log(this.next_days);




    this.month = new Date().getMonth() + 1;
    this.monthName = new Date().toLocaleString('default', { month: 'long' });
    this.allDaysInMonth = this.getDaysInMonth(
      this.month,
      new Date().getFullYear()
    );
    this.rowsInCalendar = Math.ceil(this.allDaysInMonth.length / 7);
    this.getAllDays();
    this.weekDaysName = this.getWeekDays();
  }

  getAllDays = () => {
    for (let i = 0; i < this.allDaysInMonth.length; i++) {
      this.days[i] = this.allDaysInMonth[i].getDate();
    }
    return this.days;
  };

  getWeekDays() {
    var baseDate = this.allDaysInMonth;
    var weekDays = [];
    for (let i = 0; i < this.allDaysInMonth.length; i++) {
      weekDays.push(
        baseDate[i].toLocaleDateString('default', { weekday: 'short' })
      );
    }
    return weekDays;
  }

  getDaysInMonth = (month: number, year: number) =>
    new Array(31)
      .fill('')
      .map((v, i) => new Date(year, month - 1, i + 1))
      .filter((v) => v.getMonth() === month - 1);

  async ngOnInit() {
    await this.globals.getMonthlyLogTasks();
    await this.globals.getMonthlyLogTasksNoDate();
    this.globals.curLog = 'monthly';
  }

  refreshTasks() {}
}
