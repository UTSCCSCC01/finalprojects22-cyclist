import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  addTagMenu = false;

  constructor(
    public globals: GlobalsService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.globals.getAllTags();
  }

  selectTag(tagID: string) {
    
  }

  addTag() {
    this.addTagMenu = !this.addTagMenu;
  }

  form: FormGroup = this.fb.group({
    name: [null],
    color: [null]
  });

  async submitForm() {
    if (!this.form.value.name || !this.form.value.color) return;

    this.addTagMenu = false;
    await this.globals.createTag(this.form.value);
    this.form.reset();
  }

  // TODO: toggle viewing certain groups
  // switchView(this) {
  //   document.querySelector(".switch-views a")?.classList.remove("selected");
  //   this.classList.add("selected");
  // }

  // TODO: delete groups

}
