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
    my_v: this.apiBase + 'my/venues',               // Get a users attendance
    v_attend: this.apiBase + 'venue/attendance',    // Get a users attendance
  };
  public myAttendance;
  public venueAttendance;

  constructor(
    private _auth: AuthService,
    private _http: Http,
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}

  public getMyAttendance() {
    this.getMyV()
      .subscribe(attendance => this.myAttendance = attendance);
  }

  public getVenueAttendance(venues) {
    this.getTheseV(venues)
      .subscribe(attendance => this.venueAttendance = attendance);
  }

  private getMyV(): Observable<boolean> {
    this._log['log']('auth::getMyV(): ', this._apiRoute.my_v);
    return this._http
      .get(this._apiRoute.my_v, <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch((err:Response) => {
        if(err.json().authenticated === false) this._auth.authStatus = false;
        return Observable.throw({detail:err.json(),status: err.status});
      });
  }

  private getTheseV(venues): Observable<boolean> {
    let body = JSON.stringify(venues);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this._log['log']('auth::getTheseV(): ', this._apiRoute.v_attend);
    return this._http
      .post(this._apiRoute.v_attend, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res.json())
      .catch((err:Response) => {
        if(err.json().authenticated === false) this._auth.authStatus = false;
        return Observable.throw({detail:err.json(),status: err.status});
      });
  }

}
