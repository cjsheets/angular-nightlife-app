import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from "./shared/auth.service";
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

  googleLink = '/authorize/google';
  authenticatedObs: Observable<boolean>;
  userServiceSub: Subscription;
  authSub: Subscription;
//  private _api: string = 'https://angular-nightlife.herokuapp.com';
  private _api: string = 'https://angular-nightlife.herokuapp.com';
  public isAuth: boolean = false;

  constructor(
    private _auth: AuthService,
    private _yelp: YelpService,
    private _log: Logger,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.subs[this.subs.length] = this._router.events.subscribe(event => {
      this.activeRoute = event.url;
    });
    this.authenticated();
    this.subs[this.subs.length] = this.authenticatedObs.subscribe(auth => {
      this.isAuth = auth;
    });
  }
  ngOnDestroy() {
          console.log('unsub')
    for(let sub of this.subs) sub.unsubscribe();
  }


  authenticated(): Observable<boolean> {
    this._log['log']('authenticated() ');
    if (this.authenticatedObs) return this.authenticatedObs;
    this.authenticatedObs = this._auth.authenticated()
      .map(data => {return data.authenticated});
    return this.authenticatedObs;
  }


  isAuthenticated(): boolean {
    this._log['log']('isAuthenticated(): ' + this.isAuth);
    return this.isAuth;
  }

  redirectAuth(provider: string) {
    this._log['log']('Redirecting to ' + provider + ' for authentication');
    window.location.href=("/auth/" + provider);
  }

  /**
   * Total hack until new router is used (for authentication and activation logic)
   * Thanks to: https://github.com/domfarolino/angular2-login-seed
   */
  openAuthWindow(provider: string) {
    var newWindow = window.open(`${this._api}/auth/${provider}`, 'name', 'height=585, width=770');
	   if (window.focus) {
       newWindow.focus();
     }

     let source = Observable.interval(2000)
      .map(() => {
        console.log('polling, 2 seconds')
        this.userServiceSub = this.authenticated().subscribe(data => {
          if (data) {
          this._router.navigate(['/']);
          newWindow.close();
        }
       })
    })

    if (this.authSub) this.authSub.unsubscribe();
    this.authSub = source.subscribe();

  }
}
