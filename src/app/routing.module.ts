import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { WelcomeComponent } from './welcome/welcome.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppComponent,
  SearchComponent,
  WelcomeComponent
];

const routes: Routes = [
  { path: 'nl', component: WelcomeComponent },
  { path: 'nl/search', component: SearchComponent },
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