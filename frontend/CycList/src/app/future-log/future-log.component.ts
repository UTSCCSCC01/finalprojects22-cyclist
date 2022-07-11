import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-future-log',
  templateUrl: './future-log.component.html',
  styleUrls: ['./future-log.component.scss']
})
export class FutureLogComponent implements OnInit {
  month;
  // monthName;
  monthNames;

  constructor(public globals: GlobalsService) {
    let today = new Date();
    this.month = today.getMonth() + 1

    this.monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // this.monthName = this.monthNames[this.month - 1];
  }
  
  async ngOnInit() {
    this.globals.getFutureLogTasks();
    this.globals.curLog = "future";
  }

}
