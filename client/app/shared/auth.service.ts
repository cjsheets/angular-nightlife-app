/* -----------------------------------|
 *|  Auth Service - Passport.js
 */
import { Injectable, Inject } from '@angular/core';

import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscription }   from 'rxjs/Subscription';
import 'rxjs/add/observable/throw';
import { AuthValidResponse } from "./interface/auth.interface";

import { Logger } from '../shared/logger.service';
import * as Raven from 'raven-js';

@Injectable()
export class AuthService {
  private _apiRoute = {
    login: this._api + '/auth/local',             // Login using local credentials
    logout: this._api + '/auth/logout',           // Logout user
    authentic: this._api + '/auth/valid',         // Is user logged in
    register: this._api + '/api/users/register',  // Register new local credentials
    getUsers: this._api + '/api/users',
    getMe: this._api + '/api/users/me',
    userExists: this._api + '/api/users/exists',
  };

  public authStatus: boolean = false; // Holds last verified login state

  constructor(
    private http: Http, 
    private _log: Logger,
    @Inject('api-url') private _api: string
  ) {}

  public isLoggedIn() {
    this.isAuthentic()
      .subscribe(auth => this.authStatus = auth);
  }

  public redirectToProvider(provider: string) {
    this._log['log']('auth::redirectToProvider(provider): ' + provider);
    window.location.href=("/auth/" + provider);
  }

  private isAuthentic(): Observable<boolean> {
    this._log['log']('auth::isAuthentic(): ', this._apiRoute.authentic);
    return this.http
      .get(this._apiRoute.authentic, <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json().authenticated)
      .catch((err:Response) => {
        if(err.json().authenticated === false) this.authStatus = false;
        return Observable.throw({detail:err.json(),status: err.status});
      });
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
    this._log['log']('auth::logout() ', this._apiRoute.logout);
    let isLoggedOut$ = this.http.get(this._apiRoute.logout, 
      <RequestOptionsArgs> {withCredentials: true})
      .map((res: Response) => res.json())
      .catch(this.handleError);
    isLoggedOut$.subscribe((data: AuthValidResponse) => {
        this._log['log']('Logged Out: ' + !data.authenticated)
      });
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
