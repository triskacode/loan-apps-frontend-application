export const appConfig = {
  service: {
    auth: process.env.NEXT_PUBLIC_AUTH_SERVICE_ENDPOINT,
    user: process.env.NEXT_PUBLIC_USER_SERVICE_ENDPOINT,
    account: process.env.NEXT_PUBLIC_ACCOUNT_SERVICE_ENDPOINT,
    loan: process.env.NEXT_PUBLIC_LOAN_SERVICE_ENDPOINT,
  },
  auth: {
    cookieKey: "X-Access-Token",
  },
  cache: {
    AUTH_ME: "auth-me",
    USER_RESOURCE: "user-resource",
    LOAN_RESOURCE: "loan-resource",
  },
  payment: {
    stripeKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
};
