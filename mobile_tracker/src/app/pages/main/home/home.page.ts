import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  documentation_driver: boolean = false;
  documentation_vehicle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
