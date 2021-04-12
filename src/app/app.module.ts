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
import {MatTabsModule} from '@angular/material/tabs';
import { ApplyStructureNavComponent } from './apply-structure-nav/apply-structure-nav.component';
import {MatSelectModule} from '@angular/material/select';
import { ReadPageComponent } from './read-page/read-page.component';
import { ReadPageBeatComponent } from './read-page-beat/read-page-beat.component';
import { BrainstormTemplatePageComponent } from './brainstorm-template-page/brainstorm-template-page.component';
import { BrainstormTemplateNavComponent } from './brainstorm-template-page/brainstorm-template-nav/brainstorm-template-nav.component';
import { BrainstormTemplateDetailsComponent } from './brainstorm-template-page/brainstorm-template-details/brainstorm-template-details.component';
import { BeatBrainstormTemplateNavComponent } from './beat-brainstorm-template-nav/beat-brainstorm-template-nav.component';
import { ApplyTagNavComponent } from './apply-tag-nav/apply-tag-nav.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BeatActionNavComponent } from './beat-action-nav/beat-action-nav.component';
import {NbThemeModule, NbLayoutModule, NbButtonModule, NbIconModule, NbButtonGroupModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { WritingPageComponent } from './writing-page/writing-page.component';
import { WritingPageMirageComponent } from './writing-page/writing-page-mirage.component';
import { WritingSubheaderComponent } from './writing-page/writing-subheader/writing-subheader.component';
import { WritingSidebarComponent } from './writing-page/writing-sidebar/writing-sidebar.component';
import { WritingContentComponent } from './writing-page/writing-content/writing-content.component';
import { WritingInputComponent } from './writing-page/writing-input/writing-input.component';
import { WritingMetadataComponent } from './writing-page/writing-metadata/writing-metadata.component';
import { WritingAncestorComponent } from './writing-page/writing-ancestor/writing-ancestor.component';

export const MaterialModules = [
  MatButtonModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  BrowserAnimationsModule,
  MatCheckboxModule,
  DragDropModule,
  MatTabsModule,
  MatSelectModule,
  MatTooltipModule,
  QuillModule.forRoot({
    modules: {
      toolbar: false
    }
  }),
];

export const NebularModules = [
  BrowserAnimationsModule,
  NbThemeModule.forRoot({ name: 'corporate' }),
  NbLayoutModule,
  NbEvaIconsModule,
  NbButtonModule,
  NbIconModule,
  NbButtonGroupModule,
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
    ApplyStructureNavComponent,
    ReadPageComponent,
    ReadPageBeatComponent,
    BrainstormTemplatePageComponent,
    BrainstormTemplateNavComponent,
    BrainstormTemplateDetailsComponent,
    BeatBrainstormTemplateNavComponent,
    ApplyTagNavComponent,
    TimelineChartComponent,
    BeatActionNavComponent,
    WritingPageComponent,
    WritingSubheaderComponent,
    WritingSidebarComponent,
    WritingContentComponent,
    WritingPageMirageComponent,
    WritingInputComponent,
    WritingMetadataComponent,
    WritingAncestorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ...MaterialModules,
    FormsModule,
    ...NebularModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
