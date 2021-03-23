import { Component, OnInit } from '@angular/core'
import { AlertController, ModalController } from '@ionic/angular'
import { Observable } from 'rxjs'
import { Plan } from 'src/app/model/plan'
import { User } from 'src/app/model/user'
import { AuthService } from 'src/app/services/auth.service'
import { DbService } from 'src/app/services/db.service'
import { StripeService } from 'src/app/services/stripe.service'
import { StripePaymentPage } from 'src/app/stripe-payment/stripe-payment.page'
import { NotificationService } from 'src/app/services/notification.service'

@Component({
  selector: 'app-profile-plan',
  templateUrl: './profile-plan.page.html',
  styleUrls: ['./profile-plan.page.scss'],
})
export class ProfilePlanPage implements OnInit {
  plans$: Observable<Plan>
  user: User
  subscription: any

  constructor(
    private db: DbService,
    private auth: AuthService,
    private stripeService: StripeService,
    private notification: NotificationService,
    public alertController: AlertController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.plans$ = this.db.collectionValues$('plans')

    this.auth.user$.subscribe((user) => {
      this.user = user

      if (user.stripeCustomerId) {
        this.stripeService.getSubscription(user.uid).then((subList) => {
          this.subscription = !!subList.data[0]
        })
      }
    })
  }

  async confirmAction(
    action: 'upgrade' | 'cancel',
    plan: { title: string; price: number; stripeId: string }
  ) {
    const alertOptions =
      action === 'cancel'
        ? {
            header: 'Cancel Subscription',
            message: `Are you sure you wanna cancel your ${this.user.subscription} subscription`,
          }
        : {
            header: 'Upgrade Subscription',
            message: `Are you sure you wanna upgrade your subscription to <strong>${plan.title}</strong> for <strong>$${plan.price}/month</strong>?`,
          }

    const alert = await this.alertController.create({
      ...alertOptions,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return false
          },
        },
        {
          text: 'Confirm',
          handler: async () => {
            if (action === 'cancel') {
              const subDetails = await this.stripeService
                .getSubscription(this.user.uid)
                .then((res) => res)
              return this.stripeService
                .cancelSubscription({
                  uid: this.user.uid,
                  plan: subDetails.data[0].id,
                })
                .then((res) => {
                  return this.notification.showToast(res.status)
                })
            }

            if (this.user.stripeCustomerId) {
              const userData = {
                uid: this.user.uid,
                source: this.user.stripeCustomerId,
                plan: plan.stripeId,
              }

              await this.stripeService
                .createSubscription(userData)
                .then((stripeCustomerPayload) => {
                  if (stripeCustomerPayload.plan.active) {
                    this.notification.showToast('Plan successfully updated')
                  } else {
                    this.notification.showToastError(
                      'Looks like something went wrong'
                    )
                  }
                })
            } else {
              this.presentPaymentModal(plan)
            }
          },
        },
      ],
    })

    await alert.present()
  }

  async presentPaymentModal(plan) {
    const modal = await this.modalController.create({
      component: StripePaymentPage,
      componentProps: {
        plan: plan.title,
        amount: plan.price,
        subscriptionId: plan.stripeId,
      },
    })

    modal.onDidDismiss().then((stripeCustomerPayload: any) => {
      if (stripeCustomerPayload.plan.active) {
        this.notification.showToast('Plan successfully updated')
      } else {
        this.notification.showToastError('Looks like something went wrong')
      }
    })

    return modal.present()
  }

  // changePayment() {
  //   console.log('Test')
  // }
}
