import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyViewComponent } from './daily-view/daily-view.component';


const routes: Routes = [
  { path: 'app-daily-view', component: DailyViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
