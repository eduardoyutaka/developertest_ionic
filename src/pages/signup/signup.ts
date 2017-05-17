import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private details: UserDetails;

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public alertCtrl: AlertController) {
    this.details = {
      email: '',
      name: '',
      password: '',
      username: '' 
    }
  }

  signup() {
    if (this.details.name.length > 0) {
      if (this.details.username.length > 0) {
        this.auth.signup(this.details).then(() => {
          this.showConfirm();
        }, (err: IDetailedError<string[]>) => {
          for (let e of err.details) {
            if (e === 'conflict_email') {
              this.showAlert('Email already exists.');
            } else if (e == 'required_email') {
              this.showAlert('Email must not be empty.');
            } else if (e == 'required_password') {
              this.showAlert('Password must not be empty.');
            } else if (e == 'conflict_username') {
              this.showAlert('Username already exists.');
            } else if (e == 'invalid_email') {
              this.showAlert('Invalid email.');
            } else {
              this.showAlert('Error. Please try again later.');
            }
          }
        });
      } else {
        this.showAlert('Username must not be empty');
      }
    } else {
      this.showAlert('Name must not be empty')
    }
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Congratulations!',
      message: 'You can now login to the rating app.',
      buttons: [
        {
          text: 'Cool',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert(subTitle: string) {
    let alert = this.alertCtrl.create({
      title: 'Oops!',
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
