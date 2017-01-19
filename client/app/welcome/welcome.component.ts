import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Attendance } from "../shared/model/attendance.model";
import { ActivatedRoute, Router } from '@angular/router';

import { YelpService } from "../shared/yelp.service";
import { Logger } from "../shared/logger.service";
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: "welcome",
  templateUrl: './welcome.view.html',
  styleUrls: ['./welcome.view.css']
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _cookie: CookieService,
    private _yelp: YelpService,
    private _log: Logger,
    private _route: ActivatedRoute,
    private _router: Router
  ){}

  ngOnInit() {
    var lastSearch = this.getCookie('search');
    if(lastSearch){
      console.log('found a cookie', lastSearch)
      this.removeCookie('search');
      this.search({location: lastSearch});
    } else {
      this.removeCookie('search');
      this.removeCookie('going');
      this.removeCookie('notgoing');
    }
  }

  search(values){
    this._log['log']('search(): ', values);
    this._yelp.getBusinesses(values.location);
    this._router.navigate(['/nl/search']);
  }

  getCookie(key: string){
    return this._cookie.get(key);
  }

  removeCookie(key: string){
    return this._cookie.remove(key);
  }
}
