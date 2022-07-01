import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-monthly-log',
  templateUrl: './monthly-log.component.html',
  styleUrls: ['./monthly-log.component.scss']
})
export class MonthlyLogComponent implements OnInit {
  tasks;
  month;
  monthName;
  
  constructor(
    ) {
    this.tasks = GlobalsService.getTasks();

    let today = new Date();
    this.month = today.getMonth() + 1

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.monthName = monthNames[this.month - 1];
  }
  
  

  ngOnInit(): void {
    setInterval(() => { 
      GlobalsService.getMonthlyTasks(this.month, 2022);
      this.tasks = GlobalsService.getTasks(); 
    }, 2000);
  }

  refreshTasks() {
  }

}
