import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Attendance } from "../../../model/attendance.model";
import { ActivatedRoute, Router } from '@angular/router';

import { YelpService } from "../shared/yelp.service";
import { Logger } from "../shared/logger.service";

@Component({
  selector: "welcome",
  templateUrl: './welcome.view.html'
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _yelp: YelpService,
    private _log: Logger,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit() {
    
  }

  search(values){
    this._log['log']('search(): ', values);
    this._yelp.getBusinesses(values.location);
    this._router.navigate(['/nl/search']);
  }
}
