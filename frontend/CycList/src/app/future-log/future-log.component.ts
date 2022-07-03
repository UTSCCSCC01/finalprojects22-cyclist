import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-future-log',
  templateUrl: './future-log.component.html',
  styleUrls: ['./future-log.component.scss']
})
export class FutureLogComponent implements OnInit {

  constructor(public globals: GlobalsService) {}
  
  async ngOnInit() {
    this.globals.getFutureLogTasks();
    this.globals.curLog = "future";
  }

}
