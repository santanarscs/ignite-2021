import { query as q } from 'faunadb';
import { fauna } from '../../../services/fauna';
import { stripe } from '../../../services/stripe';



export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  console.log(subscriptionId, customerId, createAction)
  const userRef = await fauna.query(
    q.Select(
      'ref',
      q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
    ),
  );
  console.log('user ref', userRef)

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  console.log('subscription', subscription)

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    console.log('vou criar a sub no fauna')
    await fauna.query(
      q.Create(q.Collection('subscriptions'), { data: subscriptionData }),
    );
  } else {
    await fauna.query(
      q.Replace(
        q.Select(
          'ref',
          q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId)),
        ),
        { data: subscriptionData },
      ),
    );
  }
}