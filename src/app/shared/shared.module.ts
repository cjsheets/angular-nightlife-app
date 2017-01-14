import { NgModule, ErrorHandler }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';

import { Logger, ConsoleLogService } from './logger.service';

import { RavenErrorHandler } from './sentry-io.service';


@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MasonryModule
  ],
  providers: [ 
    { provide: Logger, useClass: ConsoleLogService },
    { provide: ErrorHandler, useClass: RavenErrorHandler }
  ],
})
export class SharedModule { }
