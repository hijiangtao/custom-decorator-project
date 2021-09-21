import { Injector, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Confirmable } from './confirmable.decorator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public injector: Injector, private dialog: MatDialog) {}

  ngOnInit(): void {}

  @Confirmable()
  deleteTest() {
    console.log('I am confirmed. Data is deleted!');
  }
}
