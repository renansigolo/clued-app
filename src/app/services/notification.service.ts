import { Injectable } from '@angular/core'
import { ToastController, LoadingController } from '@ionic/angular'
import { AlertController } from '@ionic/angular'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController
  ) {}

  /**
   * Show a Toast Notification
   */
  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 5000,
    })
    toast.present()
  }

  /**
   * Show an Error Notification
   */
  async showToastError(msgError: string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: msgError,
      position: 'top',
      duration: 4000,
      color: 'danger',
    })
    toast.present()
  }

  /**
   * Show Alert popup
   */
  async presentAlert(header: string, message?: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    })

    await alert.present()
  }

  /**
   * Show confirmation modal
   */
  async presentAlertConfirm(header: string, message: string) {
    const alertOptions = {
      header,
      message,
    }

    const alert = await this.alertController.create({
      ...alertOptions,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false
          },
        },
        {
          text: 'Confirm',
          handler: () => {
            return true
          },
        },
      ],
    })

    await alert.present()
  }

  /**
   * Show Loading popup
   */
  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    })
    await loading.present()
  }

  /**
   * Dismiss Loading popup
   */
  dismissLoading() {
    this.loadingController.dismiss()
  }
}
