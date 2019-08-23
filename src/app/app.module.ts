import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {MatListModule, MatIconModule, MatFormFieldModule, MatInputModule} from '@angular/material';

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
import { ViewNavComponent } from './story-details/view-nav/view-nav.component';
import { ViewPanelContentComponent } from './story-details/view-panel-content/view-panel-content.component';
import { EditPanelContentComponent } from './story-details/edit-panel-content/edit-panel-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginGateComponent,
    LoggedOutStateComponent,
    LoggedInStateComponent,
    StoryListComponent,
    StoryDetailsComponent,
    ViewNavComponent,
    ViewPanelContentComponent,
    EditPanelContentComponent
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
    MatFormFieldModule, MatInputModule,
    BrowserAnimationsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
