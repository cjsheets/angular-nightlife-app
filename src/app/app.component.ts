import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  private activeRoute: string = '';

  constructor(
    private _router: Router
  ){}

  ngOnInit(): void {
    this.subs[this.subs.length] = this._router.events.subscribe(event => {
      this.activeRoute = event.url;
    });
  }

  ngOnDestroy() {
          console.log('unsub')
    for(let sub of this.subs) sub.unsubscribe();
  }
}
