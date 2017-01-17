import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Logger } from "../shared/logger.service";
import * as Raven from 'raven-js';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(
      private _http: Http,
      private _log: Logger
    ){}

}
