import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  registering: boolean = false;
  errorMessage: string = "";
  toggleRegLog: boolean = false;

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
      this.globals.refresh();
    } else {
      this.globals.resetUser();
    }
  }

  submit() {

    if (this.registering) {
      this.hideErrors("register");
    } else {
      this.hideErrors("login");
    }

    if (this.registering) this.register();
    else this.login();
  }

  hideErrors(regOrLog: String) {

    this.errorMessage = "";
    this.globals.setErr("");

    this.toggleRegLog = true;

    return (regOrLog === "register");
  }


  checkError(form: FormGroup) {

    this.errorMessage = "";

    if (!this.toggleRegLog) {
      if (this.registering && (form.controls['confirmPassword'].dirty && (this.form.value.password !== this.form.value.confirmPassword))) {
        this.errorMessage = "Passwords don't match";
      }

      if (this.registering && (!form.controls['confirmPassword'].valid && (form.controls['confirmPassword'].dirty || form.controls['confirmPassword'].touched))) {
        this.errorMessage = "Please confirm password";
      }

      if (!form.controls['password'].valid && (form.controls['password'].dirty || form.controls['password'].touched)) {
        this.errorMessage = "Please enter password";
      }

      if (!form.controls['email'].valid && (form.controls['email'].dirty || form.controls['email'].touched)) {
        this.errorMessage = "Please enter email";
      }

      if (this.registering && (!form.controls['name'].valid && (form.controls['name'].dirty || form.controls['name'].touched))) {
        this.errorMessage = "Please enter name";
      }

      if (this.globals.getErr()) {
        this.errorMessage = this.globals.getErr();
      }

    }
    else {
      this.toggleRegLog = false;
    }

    return !(this.errorMessage == "");
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
