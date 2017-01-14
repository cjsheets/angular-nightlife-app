import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Attendance } from "../../../model/attendance.model";

import { YelpService } from "../shared/yelp.service";
import { Logger } from "../shared/logger.service";

@Component({
  selector: "search",
  templateUrl: './search.view.html'
})
export class SearchComponent implements OnInit {

  constructor(
    private _yelp: YelpService,
    private _log: Logger
  ){}

  ngOnInit() {
    
  }

  search(f){
    this._log['log']('Form Submitted', f);
    this._yelp.getBusinesses(f.location);
  }
}
