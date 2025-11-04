// Server-side only Flutterwave integration
// This file should only be imported in API routes or server components

let flw: any = null;

// Initialize Flutterwave only on server side
if (typeof window === 'undefined') {
  try {
    const Flutterwave = require('flutterwave-node-v3').default;
    flw = new Flutterwave(
      process.env.FLUTTERWAVE_PUBLIC_KEY!,
      process.env.FLUTTERWAVE_SECRET_KEY!
    );
  } catch (error) {
    console.warn('Flutterwave not available on server:', error);
  }
}

export interface PaymentData {
  amount: number;
  currency: string;
  email: string;
  name: string;
  phone: string;
  tx_ref: string;
  redirect_url?: string;
  meta?: Record<string, any>;
}

export const initializePayment = async (paymentData: PaymentData) => {
  if (!flw) {
    throw new Error('Flutterwave is not available. This function should only be called on the server side.');
  }

  try {
    const payload = {
      tx_ref: paymentData.tx_ref,
      amount: paymentData.amount,
      currency: paymentData.currency,
      redirect_url: paymentData.redirect_url || `${process.env.NEXT_PUBLIC_APP_URL}/apps/payments/success`,
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: paymentData.email,
        phonenumber: paymentData.phone,
        name: paymentData.name,
      },
      customizations: {
        title: 'CareBuild SMA Subscription',
        description: 'Site Management Platform Subscription',
        logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      },
      meta: paymentData.meta || {},
    };

    const response = await flw.Payment.initialize(payload);
    return response;
  } catch (error) {
    console.error('Flutterwave payment initialization error:', error);
    throw error;
  }
};

export const verifyPayment = async (transactionId: string) => {
  if (!flw) {
    throw new Error('Flutterwave is not available. This function should only be called on the server side.');
  }

  try {
    const response = await flw.Transaction.verify({ id: transactionId });
    return response;
  } catch (error) {
    console.error('Flutterwave payment verification error:', error);
    throw error;
  }
};

export default flw;
