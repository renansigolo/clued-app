import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage'
import { NotificationService } from './services/notification.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private notification: NotificationService
  ) {
    this.initializeApp() 
  }
  
  initializeApp() {
    this.notification.presentLoading().then(() => {
      this.storage
        .get('isLoggedIn')
        .then((val) => {
          if (val) {
            return this.router.navigate(['/home'])
          }
        })
        .finally(() => {
          this.notification.dismissLoading()
        })
    })

    this.platform.ready().then(() => {
      // Disable Back Button on Android devices
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
      
      this.statusBar.styleDefault()
      this.splashScreen.hide()
    })
  }
}
