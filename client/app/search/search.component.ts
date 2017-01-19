import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Attendance } from "../shared/model/attendance.model";

import { ApiService } from "../shared/api.service";
import { AuthService } from "../shared/auth.service";
import { GetUserAttend, GetVenueAttend } from "../shared/interface/api.interface";
import { YelpResponse, YelpBusiness } from '../shared/interface/yelp.interface';
import { YelpService } from "../shared/yelp.service";
import { Logger } from "../shared/logger.service";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: "search",
  templateUrl: './search.view.html',
  styleUrls: ['./search.view.css']
})
export class SearchComponent implements OnInit {
  private bricks: YelpBusiness[] = [];
  private venues: string[] = []; // Array containing all venue ids being displayed

  constructor(
    private _cookie: CookieService,
    private _auth: AuthService,
    private _api: ApiService,
    private _yelp: YelpService,
    private _log: Logger
  ){}

  ngOnInit() {
    this._yelp.searchResult$.subscribe((res: YelpResponse) => {
      this.bricks = [];
      this.venues = [];
      //this._log['log']('setupPolls(): ', polls)
      res.businesses.forEach((business: YelpBusiness) => {
        business.google_url = 'http://maps.google.com/?ll=' +
          business.coordinates.latitude + ',' +
          business.coordinates.longitude + ',16z&q=' + business.name;
        business.attendance = 0;
        business.attending = false;
        this.bricks.push(business);
        this.venues.push(business.id);
      });
      this.updateViewAttendance();

      var lastGoing = this.getCookie('going');
      if(lastGoing){
        console.log('found a cookie', lastGoing)
        this.removeCookie('lastGoing');
        this.sendGoing(lastGoing);
      }
      var notGoing = this.getCookie('notgoing');
      if(notGoing){
        console.log('found a cookie', notGoing)
        this.removeCookie('notgoing');
        this.sendNotGoing(notGoing);
      }
    }); // subscribe((res: YelpResponse)
  }

  updateViewAttendance(){
    this._api.getMyV()
      .subscribe(myVenues => {
        myVenues.forEach(venue => {
          if(this.venues.indexOf(venue.venue_id) != -1){
            // Like forEach or every, can be short-circuited returning `true`
            this.bricks.some(brick => {
              console.log('Found matching index for: ', venue.venue_id);
              if(brick.id == venue.venue_id){
                brick.attending = true;
                return true;
              }
            });
          }
        });
        console.log('getMyV', myVenues)
      }) // subscribe(myVenues)  .catch(); 
    this._api.getTheseV(this.venues)
      .subscribe(allVenues => {
        allVenues.forEach(venue => {
          if(this.venues.indexOf(venue.venue_id) != -1){
              // Like forEach or every, can be short-circuited returning `true`
            this.bricks.some(brick => {
              console.log('Found matching index for: ', venue.venue_id);
              if(brick.id == venue.venue_id){
                brick.attendance = venue.attendees;
                return true;
              }
            });
          }
        });
        console.log('getAllV', allVenues)
      }); // subscribe(allVenues)
  }

  search(f){
    this._log['log']('Form Submitted', f);
    this._yelp.getBusinesses(f.location);
  }

  sendGoing(id){
    if(this._auth.authStatus) {
      this._log['log']('sendGoing(id)', id);
      this._api.setAttendance(id)
        .subscribe(res => {
          this._log['log']('resposne', res);
          this.updateViewAttendance();
        });
    } else {
      this.setCookie('going', id);
      this.setCookie('search', this._yelp.searchTerm);
      this._auth.redirectToProvider('twitter');
    }
  }

  sendNotGoing(id){
    if(this._auth.authStatus) {
      this._log['log']('sendNotGoing(id)', id);
      this._api.removeAttendance(id)
        .subscribe(res => {
          this._log['log']('resposne', res);
          this.updateViewAttendance();
          // interface only checks my-venues, must manually remove attending
          this.bricks.some(brick => {
            if(brick.id == id){
              brick.attending = false;
              return true;
            }
          });
        });
    } else {
      this.setCookie('notgoing', id); // Shouldn't be possible, but just in case
      this.setCookie('search', this._yelp.searchTerm);
      this._auth.redirectToProvider('twitter');
    }
  }

  getCookie(key: string){
    return this._cookie.get(key);
  }

  setCookie(key: string, value: string){
    return this._cookie.put(key, value);
  }

  removeCookie(key: string){
    return this._cookie.remove(key);
  }
}
