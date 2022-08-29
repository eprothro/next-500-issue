import Link from 'next/link'

const Index = () => (
  <div style={{ maxWidth: 700, margin: '0 auto' }}>
    <h2>Sentry Simple Example 🚨</h2>
    <p>
      This example demonstrates how to record unhandled exceptions in your code
      with Sentry. There are several test pages below that result in various
      kinds of unhandled exceptions.
    </p>
    <p>
      It also demonstrates the performance monitoring the SDK is able to do:
      <ol>
        <li>
          A front-end transaction is recorded for each pageload or navigation.
        </li>
        <li>
          A backend transaction is recorded for each API or page route. (Note
          that currently only API routes are traced on Vercel.)
        </li>
        <li>
          Errors which occur during transactions are linked to those
          transactions in Sentry and can be found in the [trace
          navigator](https://docs.sentry.io/product/sentry-basics/tracing/trace-view/).
        </li>
        <li>
          Manual performance instrumentation is demonstrated in the final
          example below (throwing an error from an event handler).
        </li>
      </ol>
    </p>
    <p>
      <strong>Important:</strong> exceptions in development mode take a
      different path than in production. These tests should be run on a
      production build (i.e. 'next build').{' '}
      <a href="https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page">
        Read more
      </a>
    </p>
    <ol>
      <li>API route exceptions/transactions</li>
      Note that 1 and 2 are not expected to work if deployed to Vercel yet.
      <li>SSR exceptions/transactions</li>
      Note that there are currently two known bugs with respect to SSR
      transactions: they don't get recorded on Vercel, and ones that are
      recorded and have an error are grouped in the Sentry UI by the error page
      name rather than the requested page name.
      <ol>
        <li>
          getServerSideProps throws an Error. This should cause _error.js to
          render and record Error('SSR Test 1') in Sentry.{' '}
          <a href="/ssr/test1" target="_blank">
            Open in a new tab
          </a>{' '}
          or{' '}
          <Link href="/ssr/test1">
            <a>Perform client side navigation</a>
          </Link>
        </li>
        <li>
          getServerSideProps returns a Promise that rejects. This should cause
          _error.js to render and record Error('SSR Test 2') in Sentry.{' '}
          <a href="/ssr/test2" target="_blank">
            Open in a new tab
          </a>
        </li>
        <li>
          getServerSideProps calls a Promise that rejects, but does not handle
          the rejection or await its result (returning synchronously). Sentry
          should record Error('SSR Test 3'), but <strong>will not</strong> when
          deployed to Vercel because the serverless function will already have
          exited.{' '}
          <a href="/ssr/test3" target="_blank">
            Open in a new tab
          </a>
        </li>
        <li>
          getServerSideProps manually captures an exception from a try/catch.
          This should record Error('SSR Test 4') in Sentry.{' '}
          <a href="/ssr/test4" target="_blank">
            Open in a new tab
          </a>
        </li>
      </ol>
      <li>Client exceptions</li>
    </ol>
  </div>
)

export default Index
