import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollsComponent } from './pages/polls/polls.component';

const routes: Routes = [
  {
    path: '',
    children: []
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
