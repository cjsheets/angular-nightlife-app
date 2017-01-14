import { Injectable } from '@angular/core';
import { HttpClient } from './http-client.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class YelpService {
    private apiEndpoint = 'https://api.yelp.com/v3/businesses/search?location=Tacoma&limit=10&category_filter=bars';

    constructor(
      private http: HttpClient
    ){}

    getBusinesses() {
      this.http.get(this.apiEndpoint).subscribe(result => {
          console.log( result );
      });
    }


    // private handleError(error: Response) {
    //     // in a real world app, we may send the server to some remote logging infrastructure
    //     // instead of just logging it to the console
    //     console.error(error);
    //     return Observable.throw(error.json().error || 'Server error');
    // }
}
