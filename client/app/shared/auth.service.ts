/* -----------------------------------|
 *|  Auth Service - Passport.js
 */
import { Injectable, Inject } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import { Logger } from '../shared/logger.service';
import * as Raven from 'raven-js';

@Injectable()
export class AuthService {
  private _apiRoute = {
    login: this._api + '/auth/local',
    logout: this._api + '/auth/logout',
    authenticate: this._api + '/auth/valid',
    register: this._api + '/api/users/register',
    getUsers: this._api + '/api/users',
    getMe: this._api + '/api/users/me',
    userExists: this._api + '/api/users/exists',
  };
  
  constructor(
    private http: Http, 
    private _log: Logger,
    @Inject('api-url') private _api: string,
  ) {}


  authenticated() {
    this._log['log']('auth::authenticated(): ', this._apiRoute.authenticate);
    return this.http.get(this._apiRoute.authenticate, 
      <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  login(user) {
    this._log['log']('auth::login(user) ', user);
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._apiRoute.login, body, 
      <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  logout() {
    this._log['log']('auth::logout()');
    return this.http.get(this._apiRoute.logout, 
      <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  register(user) {
    this._log['log']('auth::register(user) ', user);
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._apiRoute.register, body, 
      <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  getUsers(limit: number = 5) {
    this._log['log']('auth::getUsers(limit) ', limit);
    return this.http.get(this._apiRoute.getUsers + "?limit=" + limit + 
      "&desc=true", <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getMe() {
    return this.http.get(this._apiRoute.getMe, 
      <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json().me)
      .catch(this.handleError);
  }

  private handleError(err: Response) : Observable<Response> {
    let errorMessage = 'Http Response Error :: yelp.service';
    this._log['error']('Http Response Error: ',err);
    Raven.captureException(err.json().err || errorMessage);
    return Observable.throw(err.json().err || errorMessage);
  }
}
