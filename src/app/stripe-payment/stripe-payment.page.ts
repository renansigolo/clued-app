import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core'
import { environment } from 'src/environments/environment'
import { AuthService } from 'src/app/services/auth.service'
import { StripeService } from 'src/app/services/stripe.service'
import { ModalController } from '@ionic/angular'
import { NotificationService } from 'src/app/services/notification.service'
import { ActivatedRoute, Router } from '@angular/router'
import { User } from '../model/user'

declare var Stripe // : stripe.StripeStatic
@Component({
  selector: 'app-stripe-payment',
  templateUrl: './stripe-payment.page.html',
  styleUrls: ['./stripe-payment.page.scss'],
})
export class StripePaymentPage implements OnInit, AfterViewInit {
  @Input() amount: number
  @Input() plan: string
  @Input() subscriptionId: string
  @ViewChild('cardElement') cardElement: ElementRef

  stripe // stripe.Stripe
  card // stripe.elements.Element
  cardErrors: string
  user: User
  loading = false
  confirmation: any
  isSignup

  constructor(
    private auth: AuthService,
    private stripeService: StripeService,
    private route: ActivatedRoute,
    private router: Router,
    public modalController: ModalController,
    public notification: NotificationService
  ) {}

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id')

    this.isSignup = paramId === 'signup' ? true : false

    this.initStripe()
  }

  ngAfterViewInit() {
    this.setupStripeElements()
  }

  initStripe() {
    this.stripe = Stripe(environment.stripe.key)
    const elements = this.stripe.elements()
    const style = {
      base: {
        // color: '#fff',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    }
    this.card = elements.create('card', { style })
  }

  setupStripeElements() {
    this.card.mount(this.cardElement.nativeElement)

    this.card.addEventListener('change', ({ error }) => {
      this.cardErrors = error && error.message
    })
  }

  async handleForm(e: any) {
    e.preventDefault()

    try {
      this.notification.presentLoading()
      this.user = await this.auth.getUser()
      const { source, error } = await this.stripe.createSource(this.card)

      if (error) {
        throw error
      }

      const userData = {
        uid: this.user.uid,
        source: source.id,
        plan: this.subscriptionId || environment.stripe.planId,
      }

      await this.stripeService.createCustomer(userData)
      const stripeSubscriptionData = await this.stripeService.createSubscription(
        userData
      )
      if (this.isSignup) {
        this.router.navigate(['/success'])
      } else {
        this.modalController.dismiss(stripeSubscriptionData)
      }
    } catch (error) {
      this.notification.showToastError(error.message)
    } finally {
      this.notification.dismissLoading()
    }
  }

  closeModal() {
    this.modalController.dismiss()
  }
}
