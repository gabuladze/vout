import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./guards/auth.guard";

import { CreatePollComponent } from "./pages/create-poll/create-poll.component";
import { PollDetailsComponent } from "./pages/poll-details/poll-details.component";
import { PollsComponent } from './pages/polls/polls.component';
import { UserPollsComponent } from "./pages/user-polls/user-polls.component";

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
  },
  {
    path: 'polls/create',
    component: CreatePollComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'polls/users/:id',
    component: UserPollsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
