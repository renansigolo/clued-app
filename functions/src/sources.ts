import * as functions from 'firebase-functions'
import { stripe } from './config'
import { getOrCreateCustomer } from './customers'
import { assert, assertUID, catchErrors } from './helpers'

/**
Attaches a payment source to a stripe customer account.
*/
export const attachSource = async (uid: string, source: string) => {
  const customer: any = await getOrCreateCustomer(uid)

  // const existingSource = customer.sources.data
  //   .filter((s: any) => s.id === source)
  //   .pop()

  const existingSource = customer.default_source

  if (existingSource) {
    return existingSource
  } else {
    await stripe.customers.createSource(customer.id, { source: source })
    // update default
    return await stripe.customers.update(customer.id, {
      default_source: source,
    })
  }
}

/////// DEPLOYABLE FUNCTIONS ////////
export const stripeAttachSource = functions.https.onCall(
  async (data, context) => {
    const uid = assertUID(context)
    const source = assert(data, 'source')

    return catchErrors(attachSource(uid, source))
  }
)
