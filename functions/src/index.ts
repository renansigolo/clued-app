// import * as functions from 'firebase-functions'

// export const testFunction = functions.https.onCall(async (data, context) => {
//   const uid = context.auth && context.auth.uid
//   const source = data.source
//   return ` UID: ${uid}
//   Source: ${source}`
// })

export { stripeAttachSource } from './sources'
export { stripeCreateCharge, stripeGetCharges } from './charges'
export {
  stripeCreateSubscription,
  stripeGetSubscriptions,
  stripeCancelSubscription,
} from './subscriptions'
