import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  registering: boolean = false;

  constructor(
    private fb: FormBuilder,
    public globals: GlobalsService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    // if already logged in
    this.globals.loadUser();
    this.loadSession();
  }

  form: FormGroup = this.fb.group({
    name: [null],
    email: [null],
    password: [null],
    confirmPassword: [null]
  });

  loadSession() {
    if (this.globals.isAuthenticated()) {
      this.globals.loggedIn = true;
      this.router.navigate(['/', 'app-dashboard']);
      this.globals.getAllTasks("");
    } else {
      this.globals.resetUser();
    }
  }

  submit() {
    if (this.registering) this.register();
    else this.login();
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

  async register() {
    console.log(this.form);
    if (!this.form.value.name || !this.form.value.email || 
        !this.form.value.password || !this.form.value.confirmPassword ||
        this.form.value.password !== this.form.value.confirmPassword) return;
    await this.globals.register(this.form);
    this.loadSession();
  }
}
