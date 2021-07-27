import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { ImportExportPageComponent } from './import-export-page/import-export-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HeaderTimerComponent } from './header-timer/header-timer.component';
import { ShowSessionHistoryComponent } from './show-session-history/show-session-history.component';
import { StructureTemplatePageComponent } from './structure-template-page/structure-template-page.component';
import {StructureTemplateNavComponent} from './structure-template-page/structure-template-nav/structure-template-nav.component';
import {StructureTemplateDetailsComponent} from './structure-template-page/structure-template-details/structure-template-details.component';
import {FormsModule} from '@angular/forms';
import { TagPageComponent } from './tag-page/tag-page.component';
import { TagNavComponent } from './tag-page/tag-nav/tag-nav.component';
import { TagDetailsComponent } from './tag-page/tag-details/tag-details.component';
import { ReadPageComponent } from './read-page/read-page.component';
import { ReadPageBeatComponent } from './read-page-beat/read-page-beat.component';
import { BrainstormTemplatePageComponent } from './brainstorm-template-page/brainstorm-template-page.component';
import { BrainstormTemplateNavComponent } from './brainstorm-template-page/brainstorm-template-nav/brainstorm-template-nav.component';
import { BrainstormTemplateDetailsComponent } from './brainstorm-template-page/brainstorm-template-details/brainstorm-template-details.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { WritingPageComponent } from './writing-page/writing-page.component';
import { WritingSubheaderComponent } from './writing-page/writing-subheader/writing-subheader.component';
import { WritingSidebarComponent } from './writing-page/writing-sidebar/writing-sidebar.component';
import { WritingContentComponent } from './writing-page/writing-content/writing-content.component';
import { WritingInputComponent } from './writing-page/writing-input/writing-input.component';
import { WritingMetadataComponent } from './writing-page/writing-metadata/writing-metadata.component';
import { WritingAncestorComponent } from './writing-page/writing-ancestor/writing-ancestor.component';
import { WritingStructureComponent } from './writing-page/writing-sidebar/writing-structure/writing-structure.component';
import { WritingTagAssignmentComponent } from './writing-page/writing-sidebar/writing-tag-assignment/writing-tag-assignment.component';
import { IconButtonComponent } from './icon-button/icon-button.component';

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
    ReadPageComponent,
    ReadPageBeatComponent,
    BrainstormTemplatePageComponent,
    BrainstormTemplateNavComponent,
    BrainstormTemplateDetailsComponent,
    TimelineChartComponent,
    WritingPageComponent,
    WritingSubheaderComponent,
    WritingSidebarComponent,
    WritingContentComponent,
    WritingInputComponent,
    WritingMetadataComponent,
    WritingAncestorComponent,
    WritingStructureComponent,
    WritingTagAssignmentComponent,
    IconButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
