import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
//import { ApiRestService } from './api-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portafolio-web';
  public readonly publicKey = 'BOCuH-S3lasC9zS6Auo3YOn8b3wLPdCY90pDGYEwjVYhR6lt_s3AYpgwcksn1gPOVEFzF6Y_rU6aNFzxDJboe74';

  constructor(private swPush: SwPush/*, private apiRestService: ApiRestService*/) {
    //this.subscribeToNotifications();
  }

  ngOnInit() {
    this.PushSubscription();
  }
  /*subscribeToNotifications(): any {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }). then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
      //console.log('-----------------', token);
     this.apiRestService.saveToken(token).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log('error', err);
        }
        });
    }).catch(err => console.error('Could not subscribe to notifications', err));
  }*/

  PushSubscription() {
    //verifcacion si esta instalado service worker si no esta que lo instale
    if(!this.swPush.isEnabled) {
      console.log('notificaciones no esta instalada')
      return;
    }
    this.swPush.requestSubscription({
      serverPublicKey: this.publicKey,
    }).then(sub=> console.log).catch(err=>console.log)
  }
}
//instalar service worker para utilizacion de notificaciones push y para que se de la opcion de instalar la pagina web como applicacion nativa del sistema


