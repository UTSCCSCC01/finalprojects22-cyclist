import { Component, OnInit } from '@angular/core';
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
  days: any[] = [];
  weekDaysName: string[];

  constructor(public globals: GlobalsService) {
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
    this.globals.getMonthlyLogTasks();
    this.globals.curLog = 'monthly';
  }

  refreshTasks() {}
}
