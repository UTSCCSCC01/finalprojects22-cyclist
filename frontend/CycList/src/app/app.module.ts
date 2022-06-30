import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskComponent } from './task/task.component';
import { FutureLogComponent } from './future-log/future-log.component';
import { MonthlyLogComponent } from './monthly-log/monthly-log.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlobalsService } from './globals.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
    AddTaskComponent,
    TaskComponent,
    FutureLogComponent,
    MonthlyLogComponent,
    DailyLogComponent,
    DashboardComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GlobalsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
