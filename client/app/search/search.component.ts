import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Attendance } from "../shared/model/attendance.model";

import { ApiService } from "../shared/api.service";
import { GetUserAttend, GetVenueAttend } from "../shared/interface/api.interface";
import { YelpResponse, YelpBusiness } from '../shared/interface/yelp.interface';
import { YelpService } from "../shared/yelp.service";
import { Logger } from "../shared/logger.service";

@Component({
  selector: "search",
  templateUrl: './search.view.html',
  styleUrls: ['./search.view.css']
})
export class SearchComponent implements OnInit {
  private bricks: YelpBusiness[] = [];
  private venues: string[] = []; // Array containing all venue ids being displayed

  constructor(
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
      });  // subscribe(myVenues)
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
    this._log['log']('sendGoing(id)', id);
    this._api.setAttendance(id)
      .subscribe(res => {
        this._log['log']('resposne', res);
        this.updateViewAttendance();
      });
  }
  sendNotGoing(id){
    this._log['log']('sendNotGoing(id)', id);
    this._api.removeAttendance(id)
      .subscribe(res => {
        this._log['log']('resposne', res);
        this.updateViewAttendance();
        this.bricks.some(brick => {
          if(brick.id == id){
            brick.attending = false;
            return true;
          }
        });
      });
  }
}
