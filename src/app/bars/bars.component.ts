import { Component, OnInit } from '@angular/core';

import { Logger } from '../shared/logger.service';
import template from "./bars.view.html";

@Component({
  selector: 'bars',
  template
})
export class BarsComponent implements OnInit {

    tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private _log: Logger,
  ) {}


  ngOnInit(): void {

  }
}