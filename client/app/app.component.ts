import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from "./shared/auth.service";
import { AuthValidResponse } from "./shared/interface/auth.interface";
import { YelpService } from "./shared/yelp.service";

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
    private _yelp: YelpService,
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

  checkLoggedIn() {
    this._auth.isLoggedIn();
    console.log(this._auth.authStatus)
  }

  logout() {
    this._auth.logout()
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
