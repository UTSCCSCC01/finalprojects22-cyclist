import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = this.fb.group({
    username: [null],
    password: [null]
  });



}
