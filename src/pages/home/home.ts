import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ApiService } from '../../services/api.service';

import { RestaurantPage } from '../restaurant/restaurant';
import { AddRestaurantPage } from '../add-restaurant/add-restaurant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  private restaurants: Object[];
  private ratingStars: Array<any>;

  constructor(public navCtrl: NavController, private _apiService: ApiService) {
    this.restaurants = [];
    this.ratingStars = [];
  }

  ngOnInit() {
    this.initializeRestaurants();
  }

  initializeRestaurants() {
    this._apiService.getIndexRestaurants()
      .subscribe(res => {
        this.restaurants = res.json();
        for (let r in this.restaurants) {
          this.ratingStars[r] = new Array(Math.round(this.restaurants[r]['rating']));
        }
      }, err => {
        console.log(err);
      }, () => {
        console.log(this.ratingStars);
      });
  }

  pushRestaurant(restaurant: Object) {
    this.navCtrl.push(RestaurantPage, {
      restaurant: restaurant
    })
  }

  pushAddRestaurant() {
    this.navCtrl.push(AddRestaurantPage);
  }

  getRestaurants(ev) {
    // Reset items back to all of the items
    this._apiService.getIndexRestaurants()
      .subscribe(res => {
        this.restaurants = res.json();
        for (let restaurant of this.restaurants) {
          this.ratingStars = new Array(Math.round(restaurant['rating']));
        }
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
