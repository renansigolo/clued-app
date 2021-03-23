import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { NotificationService } from '../services/notification.service'
import { Observable } from 'rxjs'
import { Plan } from '../model/plan'
import { DbService } from '../services/db.service'

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})
export class PlansPage implements OnInit {
  activePlan: string
  plans$: Observable<Plan>

  constructor(
    private db: DbService,
    private router: Router,
    private auth: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.plans$ = this.db.collectionValues$('plans')
  }

  selectPlan(planSelected: string) {
    this.activePlan = planSelected
  }

  routeSelection() {
    switch (this.activePlan) {
      case 'basic': // Set free plan subscription
        this.auth
          .setSubscription(this.activePlan)
          .then(() => {
            this.router.navigate(['/success'])
          })
          .catch((err) => {
            this.notification.showToastError(err)
          })
        break
      case 'premium':
        this.auth.paidPlan = this.activePlan // Store subscription plan before validating payment details
        this.router.navigateByUrl('/stripe-payment/signup')
        break
    }
  }
}
