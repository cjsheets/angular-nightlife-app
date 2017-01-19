import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { NgbAlertComponent } from './alert.component';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { YelpService } from './yelp.service';
import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';
import { environment } from '../../environments/environment';

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
    NgbModule,
    NgbAlertComponent,
    MasonryModule
  ],
  providers: [
    AuthService,
    ApiService,
    CookieService,
    YelpService,
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: 'api-url', useValue: environment.api_url },
  ],
})
export class SharedModule { }
