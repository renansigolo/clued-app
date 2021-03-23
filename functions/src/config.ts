// Initialize Firebase Admin
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// Initialize Cloud Firestore Database
export const db = admin.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)

// Use for Production
const stripeSecret = functions.config().stripe.secret

// Use for Development
// const stripeSecret = 'sk_test_Q5Q8ZkTrHHVc6reHANCXqM6M00xcsz9o7d'

// Stripe
import Stripe from 'stripe'
export const stripe = new Stripe(stripeSecret, {
  apiVersion: '2019-12-03',
  typescript: true,
})
