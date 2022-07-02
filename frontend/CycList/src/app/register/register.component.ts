import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder
    ) {
  }

  ngOnInit(): void {
  }

  form: FormGroup = this.fb.group({
    email: [null],
    username: [null],
    password: [null],         
    confirmpassword: [null]
  });

}
