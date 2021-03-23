import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { ProfileEditPage } from './profile-edit.page'

const routes: Routes = [
  {
    path: '',
    component: ProfileEditPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfileEditPage],
  exports: [ProfileEditPage],
})
export class ProfileEditPageModule {}
