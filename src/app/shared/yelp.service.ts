import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Logger } from "../shared/logger.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

var env = require('../../environments/local.env.js'); 

@Injectable()
export class YelpService {
//    private apiEndpoint = 'https://api.yelp.com/v3/businesses/search?location=Tacoma&limit=10&category_filter=bars';


private apiEndpoint = 'https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972'


    constructor(
      private _http: Http,
      private _log: Logger
    ){}

    getBusinesses() {
      this.get(this.apiEndpoint).subscribe(result => {
          console.log( result );
      });
    }


    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization','Bearer ' + env.yelp.key); 
  }

  get(url) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.createAuthorizationHeader(headers);
    return this._http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.createAuthorizationHeader(headers);
    return this._http.post(url, data, {
      headers: headers
    });
  }
}
