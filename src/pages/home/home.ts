import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private restaurants: Object[];

  constructor(public navCtrl: NavController, private _apiService: ApiService) {

  }

  ngOnInit() {
    this.initializeRestaurants();
  }

  initializeRestaurants() {
    this._apiService.getIndexRestaurants()
      .subscribe(res => {
        this.restaurants = res.json();
      });
  }

  getRestaurants(ev) {
    // Reset items back to all of the items
    this._apiService.getIndexRestaurants()
      .subscribe(res => {
        this.restaurants = res.json();
      }, err => {
        console.log(err);
      }, () => {
        // set val to the value of the ev target
        var val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.restaurants = this.restaurants.filter((restaurant) => {
            return (restaurant['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      });
  }
}
