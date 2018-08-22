import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DisqusPage } from './disqus';

@NgModule({
  declarations: [
    DisqusPage,
  ],
  imports: [
    IonicPageModule.forChild(DisqusPage),
  ],
})
export class DisqusPageModule {}
