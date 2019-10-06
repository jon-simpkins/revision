import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import {
  MatSelectModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatCardModule,
  MatSliderModule,
  MatDividerModule,
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGateComponent } from './login-gate/login-gate.component';
import { LoggedOutStateComponent } from './logged-out-state/logged-out-state.component';
import { LoggedInStateComponent } from './logged-in-state/logged-in-state.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { ViewNavComponent } from './story-details/view-nav/view-nav.component';
import { ViewPanelContentComponent } from './story-details/view-panel-content/view-panel-content.component';
import { EditPanelContentComponent } from './story-details/edit-panel-content/edit-panel-content.component';
import { EditHeaderComponent } from './story-details/edit-header/edit-header.component';
import { EditNavComponent } from './story-details/edit-nav/edit-nav.component';
import { StructureEditorComponent } from './structure-editor/structure-editor.component';
import { BeatCardListComponent } from './structure-editor/beat-card-list/beat-card-list.component';
import { StructureEditPanelComponent } from './story-details/edit-panel-content/structure-edit-panel/structure-edit-panel.component';
import {StructureBlockContentEditPanelComponent} from './story-details/edit-panel-content/structure-block-content-edit-panel/structure-block-content-edit-panel.component';
import {ScriptEditPanelComponent} from './story-details/edit-panel-content/script-edit-panel/script-edit-panel.component';
import {QuillReadonlyComponent} from './story-details/view-panel-content/quill-readonly/quill-readonly.component';
import {TutorialComponent} from './tutorial/tutorial.component';

const APP_COMPONENTS = [
  AppComponent,
  LoginGateComponent,
  LoggedOutStateComponent,
  LoggedInStateComponent,
  StoryListComponent,
  StoryDetailsComponent,
  ViewNavComponent,
  ViewPanelContentComponent,
  EditPanelContentComponent,
  EditHeaderComponent,
  EditNavComponent,
  StructureEditorComponent,
  BeatCardListComponent,
  StructureEditPanelComponent,
  StructureBlockContentEditPanelComponent,
  ScriptEditPanelComponent,
  QuillReadonlyComponent,
  TutorialComponent,
];

const MATERIAL_IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  MatButtonModule,
  MatDividerModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule,
  MatSliderModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: [].concat(APP_COMPONENTS),
  imports: [].concat(MATERIAL_IMPORTS),
  exports: [].concat(APP_COMPONENTS).concat(MATERIAL_IMPORTS), // Export everything, so Storybook creation is easier
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
