import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';

import { AuthService } from "./auth.service";
import { Logger } from "./logger.service";
import * as Raven from 'raven-js';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {
  private apiBase = this._api + '/api/nightlife/';
  private _apiRoute = {
    get: this.apiBase + 'my/venues',          // Get a users attendance
    get: this.apiBase + 'venue/attendance',   // Get a users attendance
  };
  public myAttendance;

  constructor(
    private _auth: AuthService,
    private _http: Http,
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}

  public getMyAttendance() {
    this.get()
      .subscribe(attendance => this.myAttendance = attendance);
  }

  private get(): Observable<boolean> {
    this._log['log']('auth::getMyAttendance(): ', this._apiRoute.get);
    return this._http
      .get(this._apiRoute.get, <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch((err:Response) => {
        if(err.json().authenticated === false) this._auth.authStatus = false;
        return Observable.throw({detail:err.json(),status: err.status});
      });
  }

}
