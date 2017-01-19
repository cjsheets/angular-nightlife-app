import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Logger } from "./logger.service";
import * as Raven from 'raven-js';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';

@Injectable()
export class YelpService {
    private apiEndpoint = this._api + '/api/proxy/search?limit=20&category_filter=bars&location=';
//    private apiEndpoint = '/assets/api/query.json';
    public searchTerm: string = '';
    public searchResult$: ReplaySubject<{}> = new ReplaySubject(1);

  constructor(
    private _http: Http,
    private _log: Logger,
    @Inject('api-url') private _api: string
  ){}

  getBusinesses(location: string) {
    console.log('getBusinesses(): ', location);
    this.yelpGet(this.apiEndpoint + location).subscribe(res => {
      //this._log['log']('getBusinesses(): ', res);
      //this._log['log']('getBusinesses() - response: ', JSON.stringify(res));
      this.searchResult$.next(res);
    }, err => this.handleError(err));
    this.searchTerm = location;
  }

  createAuthHeader(headers: Headers) : void {
    headers.append('Authorization','Bearer ' + environment.yelp.access_token); 
  }

  yelpGet(url) : Observable<Response> {
    console.log('get(): ', url);
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.createAuthHeader(headers);
    return this._http.get(url, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  post(url, data) : Observable<Response> {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.createAuthHeader(headers);
    return this._http.post(url, data, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  private handleError(err: Response) : Observable<Response> {
    let errorMessage = 'Http Response Error :: yelp.service';
    console.log('Error Handler: ', err);
    //this._log['error']('Http Response Error: ',err);
    Raven.captureException(err.json().err || errorMessage);
    return Observable.throw(err.json().err || errorMessage);
  }
}
