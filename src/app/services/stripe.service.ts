import { Injectable } from '@angular/core'
import { AngularFireFunctions } from '@angular/fire/functions'
import { NotificationService } from './notification.service'

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(
    private functions: AngularFireFunctions,
    public notification: NotificationService
  ) {}

  /** Create a SOURCE/CUSTOMER on Stripe and returns the confirmation */
  async createCustomer(userPayload) {
    const fun = this.functions.httpsCallable('stripeAttachSource')
    return fun(userPayload).toPromise()
  }

  /** Create a Subscription on Stripe
   *
   * @param uid from firebase
   * @param source from stripe or firebase
   * @param plan from firebase
   */
  async createSubscription(subscriptionPayload) {
    const fun = this.functions.httpsCallable('stripeCreateSubscription')
    return fun(subscriptionPayload).toPromise()
  }

  /** Get a current subscription from Stripe
   *
   * @param uid from firebase
   */
  async getSubscription(uid) {
    const fun = this.functions.httpsCallable('stripeGetSubscriptions')
    return fun(uid).toPromise()
  }

  /** Cancel a current subscription on Stripe
   *
   * @param uid from firebase
   * @param plan with planId as a value
   *
   */
  async cancelSubscription(userPayload) {
    const fun = this.functions.httpsCallable('stripeCancelSubscription')
    return fun(userPayload).toPromise()
  }
}
