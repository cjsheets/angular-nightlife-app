import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from "./shared/auth.service";
import { ApiService } from "./shared/api.service";
import { AuthValidResponse } from "./shared/interface/auth.interface";
import { YelpService } from "./shared/yelp.service";

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Logger } from './shared/logger.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private activeRoute: string = '';

  private authStatus: boolean = false;

  constructor(
    private _auth: AuthService,
    private _api: ApiService,
    private _yelp: YelpService,
    private modalService: NgbModal,
    private _log: Logger,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.checkLoggedIn();
    this.subs[this.subs.length] = this._router.events
      .subscribe(event => this.activeRoute = event.url);
  }

  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }

  search(values){ // Hacky to have search function in two components.
    this._log['log']('search(): ', values);
    this._yelp.getBusinesses(values.location);
    this._router.navigate(['/nl/search']);
  }

  checkLoggedIn() {
    this._auth.isLoggedIn();
  }

  getAttendance() {
    this._api.getMyAttendance();
    console.log(this._api.myAttendance);
  }

  getVenues() {
    this._api.getVenueAttendance(['this-is-an-id', 'this-isnt-stored', 'this-is-yet-another-id']);
    console.log(this._api.venueAttendance);
  }

  logout() {
    this._auth.logout()
  }

  open(content) {
    this._log['log']( "Open Modal" );
    this.modalService.open(content).result.then((result) => {
      this._log['log']( "Modal:" );
    }, (reason) => {
      this._log['log']( "Close Modal:" );
    });
  }

  // /**
  //  * Total hack until new router is used (for authentication and activation logic)
  //  * Thanks to: https://github.com/domfarolino/angular2-login-seed
  //  */
  // openAuthWindow(provider: string) {
  //   var newWindow = window.open(`${this._api}/auth/${provider}`, 'name', 'height=585, width=770');
	//    if (window.focus) {
  //      newWindow.focus();
  //    }

  //    let source = Observable.interval(2000)
  //     .map(() => {
  //       console.log('polling, 2 seconds')
  //       this.userServiceSub = this.authenticated().subscribe(data => {
  //         if (data) {
  //         this._router.navigate(['/']);
  //         newWindow.close();
  //       }
  //      })
  //   })

  //   if (this.authSub) this.authSub.unsubscribe();
  //   this.authSub = source.subscribe();
  // }
}
