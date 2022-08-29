/**
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

// import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'
import NextErrorComponent from 'next/error'

const CustomErrorComponent = (props: { statusCode: any }) => (
  <NextErrorComponent statusCode={props.statusCode} />
)

async function reportError(contextData: NextPageContext) {
  if(contextData.err){
    console.log("reporting error to error service:")
    console.log(`  message: ${contextData.err.message}`)
    console.log(`  stack: ${contextData.err.stack}`)
    console.log("done reporting error.")
  } else {
    console.log("An error occurred, but there was no error information in the NextPageContext:")
    console.log(`  path: ${contextData.asPath}`)
    console.log(`  page: ${contextData.pathname}`)
    console.log(`  status: ${contextData.res?.statusCode}`)
  }
}

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  // await Sentry.captureUnderscoreErrorException(contextData)
  await reportError(contextData)

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData)
}

export default CustomErrorComponent
