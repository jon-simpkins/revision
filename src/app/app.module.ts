import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGateComponent } from './login-gate/login-gate.component';
import { LoggedOutStateComponent } from './logged-out-state/logged-out-state.component';
import {MatDividerModule} from '@angular/material';
import { LoggedInStateComponent } from './logged-in-state/logged-in-state.component';
import { StoryListComponent } from './story-list/story-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginGateComponent,
    LoggedOutStateComponent,
    LoggedInStateComponent,
    StoryListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
