import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollDetailsComponent } from "./pages/poll-details/poll-details.component";
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
  },
  {
    path: 'polls/:id/view',
    component: PollDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
