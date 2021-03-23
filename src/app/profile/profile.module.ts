import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { ProfileComponent } from './profile.component'

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [ProfileComponent],
  exports: [ProfileComponent],
})
export class ProfileComponentModule {}
