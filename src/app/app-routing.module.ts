import { NgModule } from '@angular/core'
import {
  AngularFireAuthGuard,
  loggedIn,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToHome = () => redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'plans',
    loadChildren: () =>
      import('./plans/plans.module').then((m) => m.PlansPageModule),
    // canActivate: [AngularFireAuthGuard], data: { authGuardPipe: loggedIn }
  },
  {
    path: 'stripe-payment',
    loadChildren: () =>
      import('./stripe-payment/stripe-payment.module').then(
        (m) => m.StripePaymentPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'success',
    loadChildren: () =>
      import('./success/success.module').then((m) => m.SuccessPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profile-edit',
    loadChildren: () =>
      import('./profile/profile-edit/profile-edit.module').then(
        (m) => m.ProfileEditPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profile-plan',
    loadChildren: () =>
      import('./profile/profile-plan/profile-plan.module').then(
        (m) => m.ProfilePlanPageModule
      ),
    // canActivate: [AngularFireAuthGuard], data: { authGuardPipe: loggedIn }
  },
  {
    path: 'manage-devices',
    loadChildren: () =>
      import('./profile/manage-devices/manage-devices.module').then(
        (m) => m.ManageDevicesPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '**',
    redirectTo: 'welcome',
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
