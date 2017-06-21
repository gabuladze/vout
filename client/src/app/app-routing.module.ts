import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsComponent } from './pages/polls/polls.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/polls',
    pathMatch: 'full'
  },
  {
    path: 'polls',
    component: PollsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
