import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyLogComponent } from './monthly-log/monthly-log.component';
import { FutureLogComponent } from './future-log/future-log.component';
import { DailyLogComponent } from './daily-log/daily-log.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'app-daily-log', component: DailyLogComponent },
  { path: 'app-monthly-log', component: MonthlyLogComponent },
  { path: 'app-future-log', component: FutureLogComponent },
  { path: 'app-dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
