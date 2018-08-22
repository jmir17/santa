import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import dataset from './dataset';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private data = dataset.days;
  private favs: Array<Number>;
  constructor(private toastCtrl: ToastController, private localNotifications: LocalNotifications, public navCtrl: NavController, private alertCtrl: AlertController) {
    this.favs = new Array();
  }

  public isFavourite(id: Number): boolean{
    return this.favs.indexOf(id) >= 0;
  }

  public displayDetails = (title: string, desc: string): void => {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: desc,
      buttons: ['Cerrar']
    });
    alert.present();
  }

  public addFav = (item: any) => {
   if (this.favs.indexOf(item.id) < 0){
    this.localNotifications.schedule({
      id: item.id,
      text: item.name + 'empezará en 30 minutos.',
      trigger: {at: item.time + 1000*60*30*(-1)}
      //trigger: {at: new Date(new Date().getTime() + 3000)}
    });
    this.favs.push(item.id);
   }
   this.addedToFavourites();
  }

  public removeFav = (id: Number) => {
    if (this.favs.indexOf(id) >= 0){
      this.localNotifications.cancel(id);
      this.favs.splice(this.favs.indexOf(id),1);
    }
    this.removedFromFavourites();
  }

  private addedToFavourites() {
    let toast = this.toastCtrl.create({
      message: 'Añadida a favoritos. Te avisaremos 30 min antes de que empiece la actividad.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  private removedFromFavourites() {
    let toast = this.toastCtrl.create({
      message: 'Actividad quitada de favoritos.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
