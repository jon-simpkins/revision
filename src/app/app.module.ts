import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

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
  MatSidenavModule, MatSnackBarModule, MatProgressSpinnerModule, MatTableModule, MatCheckboxModule
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
import { StructureBlockContentEditPanelComponent } from './story-details/edit-panel-content/structure-block-content-edit-panel/structure-block-content-edit-panel.component';
import { ScriptEditPanelComponent } from './story-details/edit-panel-content/script-edit-panel/script-edit-panel.component';
import { QuillReadonlyComponent } from './story-details/view-panel-content/quill-readonly/quill-readonly.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LandingPageComponent } from './logged-in-state/landing-page/landing-page.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { WorkspaceMenuComponent } from './v2-components/workspace-menu/workspace-menu.component';
import { V2RouterComponent } from './v2-components/v2-router/v2-router.component';
import { ActionMenuComponent } from './v2-components/action-menu/action-menu.component';
import { DetailSimilarMoviesComponent } from './v2-components/detail-similar-movies/detail-similar-movies.component';
import { CreateNewStoryComponent } from './v2-components/create-new-story/create-new-story.component';
import { ActionBarComponent } from './v2-components/action-bar/action-bar.component';
import { RevisionHistoryComponent } from './v2-components/revision-history/revision-history.component';
import { AssignSimilarMoviesComponent } from './tutorial/assign-similar-movies/assign-similar-movies.component';
import { StoryViewPageComponent } from './v2-components/story-view-page/story-view-page.component';
import { SimilarMovieListComponent } from './v2-components/similar-movie-list/similar-movie-list.component';
import { SmartLinkBtnComponent } from './v2-components/smart-link-btn/smart-link-btn.component';

const DECLARATIONS = [
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
  LandingPageComponent,
  TimelineChartComponent,
  WorkspaceMenuComponent,
  V2RouterComponent,
  ActionMenuComponent,
  DetailSimilarMoviesComponent,
  CreateNewStoryComponent,
  ActionBarComponent,
  RevisionHistoryComponent,
  AssignSimilarMoviesComponent,
  StoryViewPageComponent,
  SimilarMovieListComponent,
  SmartLinkBtnComponent,
];

const IMPORTS = [
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
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatCheckboxModule,
  BrowserAnimationsModule,
];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  exports: [].concat(DECLARATIONS).concat(IMPORTS), // Export everything, so Storybook creation is easier
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
