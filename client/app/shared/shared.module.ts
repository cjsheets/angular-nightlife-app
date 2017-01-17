import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbAlertComponent } from './alert.component';

import { AuthService } from './auth.service';
import { YelpService } from './yelp.service';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    NgbAlertComponent // To-Do: setup alert I/O
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertComponent,
    MasonryModule
  ],
  providers: [
    AuthService,
    YelpService,
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: 'api-url', useValue: 'http://localhost:5000' },
  ],
})
export class SharedModule { }
