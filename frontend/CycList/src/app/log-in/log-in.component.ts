import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalsService } from '../globals.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loggedin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cookie: CookieService
    ) {
  }

  ngOnInit(): void {
    // this.cookie.set('user', "", 2, '/', "Cyclist", true, 'Lax');
  }

  form: FormGroup = this.fb.group({
    email: [null],
    password: [null]
  });

  login() {
    GlobalsService.login(this.form);
    let user = GlobalsService.getUser();
    console.log(user);
    if (user.token === null) {
      this.cookie.set("user", user.toString());
      this.loggedin = true;
    }
  }
}
