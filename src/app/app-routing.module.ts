import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportExportPageComponent} from './import-export-page/import-export-page.component';
import {LandingPageComponent} from './landing-page/landing-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'data', component: ImportExportPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
