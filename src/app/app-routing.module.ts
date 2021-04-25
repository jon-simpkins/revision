import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportExportPageComponent} from './import-export-page/import-export-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {StructureTemplatePageComponent} from './structure-template-page/structure-template-page.component';
import {TagPageComponent} from './tag-page/tag-page.component';
import {ReadPageComponent} from './read-page/read-page.component';
import {BrainstormTemplatePageComponent} from './brainstorm-template-page/brainstorm-template-page.component';
import {WritingPageComponent} from './writing-page/writing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'data', component: ImportExportPageComponent},
  { path: 'structure-templates', component: StructureTemplatePageComponent},
  { path: 'tags', component: TagPageComponent},
  { path: 'read', component: ReadPageComponent},
  { path: 'brainstorm-templates', component: BrainstormTemplatePageComponent},
  { path: 'writing', component: WritingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
