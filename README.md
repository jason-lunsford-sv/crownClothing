# Crown Clothing Demo App

Welcome! This application is a React development test bed wherein I experiment with the latest React tech and techniques, build new (to me) UX patterns, and in general play with online services like Stripe, Firebase, and Netlify.

To play locally you'll need to set up a Stripe, Netlify, and Firebase account.

After setting up a Stripe account please create a .env file and populate it with your Public and Secret key, so you can run Stripe "locally" and make payment requests from your dev app. You will also need your access information for Firebase. Env variables you'll need are:

- REACT_APP_STRIPE_PUBLISHABLE_KEY
- REACT_APP_FIREBASE_API_KEY
- REACT_APP_FIREBASE_AUTH_DOMAIN
- REACT_APP_FIREBASE_MESSAGE_SENDER_ID
- REACT_APP_FIREBASE_APP_ID
- REACT_APP_FIREBASE_PROJECT_ID
- REACT_APP_FIREBASE_STORAGE_BUCKET
- STRIPE_SECRET_KEY