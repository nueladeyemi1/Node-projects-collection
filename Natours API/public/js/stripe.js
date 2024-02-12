import axios from 'axios';
import { showAlert } from './alerts';
// const Stripe = require("stripe");

const stripe = Stripe(
  'pk_test_51Oj2TVDpMoX5FS6ZsLh9WgXQTCcN5Wfd2GY1Nsr62hSm6yEpihSuR2rtJx1IRjo9PbaFZyIn0Vhlqngm5LAuYAwT00kuSt36au'
);

export const bookTour = async tourId => {
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
