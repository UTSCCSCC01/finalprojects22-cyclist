import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public globals: GlobalsService
    ) {
  }

  ngOnInit(): void {
    // if already logged in
    this.globals.loadUser();
    this.loadSession();
  }

  form: FormGroup = this.fb.group({
    email: [null],
    password: [null]
  });

  loadSession() {
    if (this.globals.isAuthenticated()) {
      this.globals.loggedIn = true;
      this.globals.getAllTasks("");
    } else {
      this.globals.resetUser();
    }
  }

  async login() {
    // console.log(this.cookie.get('user'));
    // stop if the form isn't full
    if (!this.form.value.email || !this.form.value.password) return;
    await this.globals.login(this.form);
    // after we have logged in we can continue
    // console.log("login: ");
    // console.log(this.globals.getUser());
    this.loadSession();
  }
}
