import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-monthly-log',
  templateUrl: './monthly-log.component.html',
  styleUrls: ['./monthly-log.component.scss']
})
export class MonthlyLogComponent implements OnInit {
  month;
  monthName;
  
  constructor(public globals: GlobalsService) {
    this.globals.getMonthlyLogTasks();

    let today = new Date();
    this.month = today.getMonth() + 1

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.monthName = monthNames[this.month - 1];
  }
  
  

  ngOnInit(): void {
  }

  refreshTasks() {
  }

}
