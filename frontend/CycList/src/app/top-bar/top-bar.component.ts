import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(public globals: GlobalsService) { }

  ngOnInit(): void {
  }

  notify() {
    console.log("ok here");
  } 

  colorMode() {
    if (this.globals.colorMode === "auto") this.globals.colorMode = "dark";
    else if (this.globals.colorMode === "dark") this.globals.colorMode = "light";
    else this.globals.colorMode = "auto";
  }

}
