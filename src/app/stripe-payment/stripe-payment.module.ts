import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { StripePaymentPage } from './stripe-payment.page'

const routes: Routes = [
  {
    path: ':id',
    component: StripePaymentPage,
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StripePaymentPage],
})
export class StripePaymentPageModule {}
