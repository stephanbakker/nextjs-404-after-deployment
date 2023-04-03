This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Issue

Sometimes navigation stops working after you do a deployment in the middle of a users session.

Nextjs is supposed to recover from outdated hashed paths, by triggering a full refresh.

However, in this specific case it fails to refresh.

### When it fails

It will fail when:
* The page needs `getServerSideProps` (Have not tried other fetch strategies!);
* And the page is loaded on the current path (using `as` prop).

In this repository you can see this in action. It has a `/step1` route.
Two of the navigation links will load this page on `/`, like `router.push('/step1', '/')` or `<Link href="/step1" as="/" />`

After a new deployment, and proceeding on the outdated page, navigating to the Step 1 page fails for those specific links.
It gets a `404` on `/SOME_OUTDATED_HASH/step1.json`, and is expected to trigger a reload of the page, but it doesn't.

Hitting the regular link to `/step1` works as expected:
You will get the same 404, but a full refresh is triggered, and the page is up to date again.

## Reproduction of the navigation fail after deployment

* Run `yarn build`
* Run `yarn start`
* Open http://localhost:3000
* (Optional) Click around to see that everything works
* Note that the last link/button contains ':FAILS', and navigates to the step1 page while showing '/' in the url bar
* Go back to your terminal while leaving the page untouched
* Run `yarn build` and `yarn start` again
* Return to the browser, and click on one of the last links/buttons containing the ':FAIL'

Result:
There is a 404 on `SOME_OUTDATED_HASH/step1.json`, and nothing happens. No refresh.

When clicking the other links to 'Step1', it also gets a 404 on `step1.json` first, but then recovers by triggering the expected page refresh.