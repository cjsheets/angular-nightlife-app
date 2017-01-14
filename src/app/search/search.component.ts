import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DemoDataService } from "../demo/demo-data.service";
import { Attendance } from "../../../../shared/model/attendance.model";
import template from "./search.view.html";
import style from "./search.view.scss";

@Component({
  selector: "search",
  template,
  styles: [ style ]
})
export class SearchComponent implements OnInit {
  greeting: string;
  data: Observable<Attendance[]>;

  constructor(private demoDataService: DemoDataService) {
    this.greeting = "Hello Demo Component!";
  }

  ngOnInit() {
    this.data = this.demoDataService.getData().zone();
  }
}
