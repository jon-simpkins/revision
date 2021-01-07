import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ImportExportPageComponent } from './import-export-page/import-export-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatButtonModule} from '@angular/material/button';
import { HeaderTimerComponent } from './header-timer/header-timer.component';
import { ShowSessionHistoryComponent } from './show-session-history/show-session-history.component';
import { StructureTemplatePageComponent } from './structure-template-page/structure-template-page.component';
import {MatListModule} from '@angular/material/list';
import {StructureTemplateNavComponent} from './structure-template-page/structure-template-nav/structure-template-nav.component';
import {StructureTemplateDetailsComponent} from './structure-template-page/structure-template-details/structure-template-details.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {QuillModule} from 'ngx-quill';
import { TagPageComponent } from './tag-page/tag-page.component';
import { TagNavComponent } from './tag-page/tag-nav/tag-nav.component';
import { TagDetailsComponent } from './tag-page/tag-details/tag-details.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BeatPageComponent } from './beat-page/beat-page.component';
import { BeatNavComponent } from './beat-nav/beat-nav.component';
import { BeatProseEditComponent } from './beat-prose-edit/beat-prose-edit.component';
import { BeatRelatedBeatNavComponent } from './beat-related-beat-nav/beat-related-beat-nav.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

export const MaterialModules = [
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  BrowserAnimationsModule,
  MatCheckboxModule,
  DragDropModule,
  QuillModule.forRoot(),
];

@NgModule({
  declarations: [
    AppComponent,
    ImportExportPageComponent,
    LandingPageComponent,
    HeaderTimerComponent,
    ShowSessionHistoryComponent,
    StructureTemplatePageComponent,
    StructureTemplateNavComponent,
    StructureTemplateDetailsComponent,
    TagPageComponent,
    TagNavComponent,
    TagDetailsComponent,
    BeatPageComponent,
    BeatNavComponent,
    BeatProseEditComponent,
    BeatRelatedBeatNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ...MaterialModules,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
