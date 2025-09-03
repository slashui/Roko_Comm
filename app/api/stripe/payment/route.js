import Stripe from 'stripe';
import { NextResponse, NextRequest } from 'next/server';




const express = require('express');

export async function POST(request, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    let data = await request.json();


    const acceptLanguage = request.headers.get('Accept-Language');
    let preferredLocale = '';
    if (acceptLanguage) {
        const locales = acceptLanguage.split(',');
      
        for (const locale of locales) {
          if (locale === 'en-US') {
            preferredLocale = 'en';
            break;
          } else if (locale === 'zh-CN') {
            preferredLocale = 'cn';
            break;
          }
        }
      }
      
      console.log(preferredLocale);
    let priceID = data.priceId;

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: priceID,
                quantity: 1,
            },
            
        ],
        metadata: { priceID: priceID },
        mode: 'payment',
        // success_url: `http://localhost:3000/${preferredLocale}/checkout/success?session_id={CHECKOUT_SESSION_ID}&price_id=${priceID}&customerid={CUSTOMER_ID}`,
        // cancel_url: `http://localhost:3000/${preferredLocale}/checkout/cancel`,
        success_url: `https://course.oneday.build/${preferredLocale}/checkout/success?session_id={CHECKOUT_SESSION_ID}&price_id=${priceID}`,
        cancel_url: `https://course.oneday.build/${preferredLocale}/checkout/cancel`,
    });
    
    return NextResponse.json(session.url)
}