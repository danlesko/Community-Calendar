import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './views/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',   redirectTo: '/calendar', pathMatch: 'full'
  },
  {
    path: 'calendar', component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
