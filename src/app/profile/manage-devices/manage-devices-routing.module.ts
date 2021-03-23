import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManageDevicesPage } from './manage-devices.page'

const routes: Routes = [
  {
    path: '',
    component: ManageDevicesPage,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageDevicesPageRoutingModule {}
