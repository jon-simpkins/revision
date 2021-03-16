import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportExportPageComponent} from './import-export-page/import-export-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {StructureTemplatePageComponent} from './structure-template-page/structure-template-page.component';
import {TagPageComponent} from './tag-page/tag-page.component';
import {BeatPageComponent} from './beat-page/beat-page.component';
import {ReadPageComponent} from './read-page/read-page.component';
import {BrainstormTemplatePageComponent} from './brainstorm-template-page/brainstorm-template-page.component';
import {WritingPageComponent} from './writing-page/writing-page.component';
import {WritingPageMirageComponent} from './writing-page/writing-page-mirage.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'data', component: ImportExportPageComponent},
  { path: 'structure-templates', component: StructureTemplatePageComponent},
  { path: 'tags', component: TagPageComponent},
  { path: 'beats', component: BeatPageComponent},
  { path: 'read', component: ReadPageComponent},
  { path: 'brainstorm-templates', component: BrainstormTemplatePageComponent},
  { path: 'writing', component: WritingPageComponent},
  { path: 'mirage/writing', component: WritingPageMirageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
