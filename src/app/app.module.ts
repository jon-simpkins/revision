import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {MatListModule} from '@angular/material';
import {MatIconModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGateComponent } from './login-gate/login-gate.component';
import { LoggedOutStateComponent } from './logged-out-state/logged-out-state.component';
import {MatDividerModule} from '@angular/material';
import { LoggedInStateComponent } from './logged-in-state/logged-in-state.component';
import { StoryListComponent } from './story-list/story-list.component';
import {MatToolbarModule} from '@angular/material';
import { StoryDetailsComponent } from './story-details/story-details.component';
import {MatSidenavModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginGateComponent,
    LoggedOutStateComponent,
    LoggedInStateComponent,
    StoryListComponent,
    StoryDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
