import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyViewComponent } from './daily-view/daily-view.component';
import { MonthlyViewComponent } from './monthly-view/monthly-view.component';


const routes: Routes = [
  { path: 'app-daily-view', component: DailyViewComponent },
  { path: 'app-monthly-view', component: MonthlyViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
