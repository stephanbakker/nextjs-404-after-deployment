This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Issue

When you have page which is loaded on the root using `as` prop, and needs `getServerSideProps`, navigation to this page will fail, if the application is loaded from a previous build.

In this repository you can see this in action. It has a `/step1` route.
Two of the navigation links will load this page on `/`.
After a new deployment, and proceeding on the outdated page, navigating to the Step 1 page => fails.
It gets a `404` on `/SOME_OUTDATED_HASH/step1.json`, and is expected to trigger a reload of the page, but this throws errors, and stops working.

Hitting the regular link to `/step1` works as expected:
You will get the same 404, but a full refresh is triggered, and the page is up to date again.

## Reproduction of the navigation fail after deployment

* Run `yarn build`
* Run `yarn start`
* Open http://localhost:3000
* (Optional) Click around to see that everything works
* Note that the last link/button contains ':FAILS', and routes to step1 while showing '/' in the url bar
* Go back to your terminal while leaving the page untouched
* Run `yarn build` and `yarn start` again
* Return to the browser, and click on one of the last links/buttons containing the ':FAIL'

Result:
There is a 404 on `step1.json`, and nothing happens

When clicking the other links to 'Step1', it also gets a 404 on step1.json first, but then recovers by triggering a page refresh.