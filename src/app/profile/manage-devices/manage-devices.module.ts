import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { ManageDevicesPageRoutingModule } from './manage-devices-routing.module'
import { ManageDevicesPage } from './manage-devices.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageDevicesPageRoutingModule,
  ],
  declarations: [ManageDevicesPage],
})
export class ManageDevicesPageModule {}
