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

export const MaterialModules = [
  MatButtonModule,
  MatListModule,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ...MaterialModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
