import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

//import { MaterialModule } from '@angular/material';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
