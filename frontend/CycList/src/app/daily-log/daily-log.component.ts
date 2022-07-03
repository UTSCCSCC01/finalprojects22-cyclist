import { Component, OnInit } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-daily-log',
  templateUrl: './daily-log.component.html',
  styleUrls: ['./daily-log.component.scss']
})
export class DailyLogComponent implements OnInit {

  constructor(public globals: GlobalsService) {}

  async ngOnInit() {
    this.globals.getNDailyTasks();
  }

}
