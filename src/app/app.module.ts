import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
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
