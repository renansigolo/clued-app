import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { ProfileComponentModule } from '../profile/profile.module'
import { HomePage } from './home.page'
import { PipesModule } from '../pipes/pipes.module'
import { SanitizeHtmlPipe } from '../pipes/sanitize-html.pipe'

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule.forChild(routes),
    ProfileComponentModule,
  ],
  declarations: [HomePage],
  providers: [SanitizeHtmlPipe],
})
export class HomePageModule {}
