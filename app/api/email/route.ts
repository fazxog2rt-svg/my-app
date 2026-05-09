import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

const emailTemplates: any = {
  orderConfirmation: (order: any) => ({
    subject: `Order Confirmation #${order.id}`,
    body: `Your order has been confirmed! Total: $${order.total.toFixed(2)}`,
  }),
  orderShipped: (order: any) => ({
    subject: `Your Order #${order.id} Has Been Shipped!`,
    body: `Your order is on its way. Track your package at the link below.`,
  }),
  orderDelivered: (order: any) => ({
    subject: `Order #${order.id} Delivered`,
    body: `Your order has been delivered. Thank you for your purchase!`,
  }),
  promotionalOffer: (offer: any) => ({
    subject: `Special Offer: ${offer.title}`,
    body: `Don't miss out! Use code ${offer.code} for ${offer.discount}% off.`,
  }),
  accountNotification: (type: any) => ({
    subject: 'Account Notification',
    body: `Important account activity detected on your account.`,
  }),
  abandonedCart: (cart: any) => ({
    subject: 'Don\'t forget your items!',
    body: `You have ${cart.items} items in your cart. Complete your purchase now!`,
  }),
};

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { emailType, data } = await request.json();

  const template = emailTemplates[emailType];
  if (!template) {
    return NextResponse.json({ error: 'Email template not found' }, { status: 404 });
  }

  const email = template(data);

  // Mock email sending
  const emailLog = {
    id: Math.random().toString(36).substr(2, 9),
    to: session.user?.email,
    subject: email.subject,
    body: email.body,
    type: emailType,
    sent: true,
    sentAt: new Date(),
  };

  return NextResponse.json({
    success: true,
    message: 'Email sent successfully',
    email: emailLog,
  });
}

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    emailTemplates: [
      'orderConfirmation',
      'orderShipped',
      'orderDelivered',
      'promotionalOffer',
      'accountNotification',
      'abandonedCart',
    ],
    message: 'Get any of these email types by sending POST request with emailType and data',
  });
}
