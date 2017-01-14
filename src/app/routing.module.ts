import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BarsComponent } from './bars/bars.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppComponent,
  SearchComponent,
  BarsComponent
];

const routes: Routes = [
  { path: 'nl', component: SearchComponent },
  { path: 'nl/search', component: BarsComponent },
  { path: '**', redirectTo: 'nl', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }