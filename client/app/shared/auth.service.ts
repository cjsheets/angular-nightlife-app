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
  constructor(
    private http: Http, 
    private _log: Logger,
  ) {}
  // Lookup how to provide string to service
//  private _api: string = 'https://angular-nightlife.herokuapp.com';
  private _api: string = 'http://127.0.0.1:5000';
  private _loginApi = this._api + '/auth/local';
  private _logoutApi = this._api + '/logout';
  private _authenticatedApi = this._api + '/auth/valid';
  private _registerApi = this._api + '/api/users/register';
  private _userExistsApi = this._api + '/api/users/exists';


  authenticated() {
    return this.http.get(this._authenticatedApi, <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  login(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._loginApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  register(user) {
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this._registerApi, body, <RequestOptionsArgs> {headers: headers, withCredentials: true})
      .map((res: Response) => res)
      .catch(this.handleError);
  }

  getUsers() {
    return this.http.get(this._api + "/api/users?limit=5&desc=true", <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getMe() {
    return this.http.get(this._api + '/api/users/me/', <RequestOptionsArgs> {withCredentials: true})
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
