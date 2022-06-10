import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // switchView(this) {
  //   document.querySelector(".switch-views a")?.classList.remove("selected");
  //   this.classList.add("selected");
  // }

}
