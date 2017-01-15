import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Attendance } from "../../../model/attendance.model";

import { YelpResponse, YelpBusiness } from '../shared/interface/yelp.interface';
import { YelpService } from "../shared/yelp.service";
import { Logger } from "../shared/logger.service";

@Component({
  selector: "search",
  templateUrl: './search.view.html',
  styleUrls: ['./search.view.css']
})
export class SearchComponent implements OnInit {
  private bricks: Array<{}> = [];

  constructor(
    private _yelp: YelpService,
    private _log: Logger
  ){}

  ngOnInit() {
    this._yelp.searchResult$.subscribe((res: YelpResponse) => {
      this.bricks = [];
      //this._log['log']('setupPolls(): ', polls)
      res.businesses.forEach((business: YelpBusiness) => {
        business.google_url = 'http://maps.google.com/?ll=' +
          business.coordinates.latitude + ',' +
          business.coordinates.longitude + ',16z&q=' + business.name;
        this.bricks.push(business);
      });
    });
  }

  search(f){
    this._log['log']('Form Submitted', f);
    this._yelp.getBusinesses(f.location);
  }
}
