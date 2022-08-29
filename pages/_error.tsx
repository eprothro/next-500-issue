import type { NextPage } from "next";
import type { ErrorProps } from "next/error";
import NextErrorComponent from "next/error";

const CustomErrorComponent: NextPage<ErrorProps> = props => {
  return (
    <p> Custom 500 page from pages/_error </p>
  );
};

CustomErrorComponent.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  console.log("reporting error to error service:")
  console.log(contextData)

  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
