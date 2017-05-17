import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ApiService } from '../../services/api.service';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'restaurant.html'
})
export class RestaurantPage implements OnInit {
  private restaurant: Object;
  private rating: number;
  private meanPrice: number;
  private ratingStars: Array<any>
  private meanPriceStars: Array<any>;

  constructor(public navCtrl: NavController, public params: NavParams, private _apiService: ApiService) {
    this.restaurant = this.params.get('restaurant');
    this.rating = this.restaurant['rating'];
    this.meanPrice = this.restaurant['mean_price'];
    this.ratingStars = new Array(Math.round(this.restaurant['rating']));
    this.meanPriceStars = new Array(Math.round(this.restaurant['mean_price']));
  }

  ngOnInit() {

  }

  review() {
    this.restaurant['rating'] = this.rating;
    this.restaurant['mean_price'] = this.meanPrice;
    this._apiService.putUpdateRestaurant(this.restaurant)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }, () => {
        this.navCtrl.setRoot(HomePage);
      });
  }
}
