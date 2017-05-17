import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Auth, User, UserDetails } from '@ionic/cloud-angular';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private details: UserDetails;

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public alertCtrl: AlertController) {
    this.details = {
      email: '',
      password: ''
    }
  }

  login() {
    this.auth.login('basic', this.details)
      .then(() => {
        this.navCtrl.setRoot(TabsPage);
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Oops!',
          subTitle: 'Please verify your password and email address.',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  signup() {
    this.navCtrl.push(SignupPage)
  }
}
