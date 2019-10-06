import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TutorialComponent} from './tutorial/tutorial.component';
import {LoggedOutStateComponent} from './logged-out-state/logged-out-state.component';
import {LoggedInStateComponent} from './logged-in-state/logged-in-state.component';


const routes: Routes = [
  {
    path: 'tutorial',
    component: TutorialComponent
  },
  {
    path: 'tutorial/:page',
    component: TutorialComponent
  },
  {
    path: 'loggedOut',
    component: LoggedOutStateComponent
  },
  {
    path: '**',
    component: LoggedInStateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
