import { Component, OnInit } from '@angular/core'
import { Device } from '@ionic-native/device/ngx'
import { AlertController } from '@ionic/angular'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-manage-devices',
  templateUrl: './manage-devices.page.html',
  styleUrls: ['./manage-devices.page.scss'],
})
export class ManageDevicesPage implements OnInit {
  devices: any
  constructor(
    private device: Device,
    private auth: AuthService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.getRegisteredDevices()
  }

  getRegisteredDevices() {
    this.auth.user$.subscribe((user) => {
      this.devices = user.registeredDevices
    })
  }

  async confirmDelete(deviceModel: string) {
    const alert = await this.alertController.create({
      header: 'Deregister Device?',
      message: `Are you sure that you want to deregister ${deviceModel}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return false
          },
        },
        {
          text: 'Deregister',
          handler: () => {
            return this.auth.deleteDevice()
          },
        },
      ],
    })

    await alert.present()
  }
}
