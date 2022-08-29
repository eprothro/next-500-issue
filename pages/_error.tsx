import type { NextPage, NextPageContext } from "next";
import type { ErrorProps } from "next/error";
import NextErrorComponent from "next/error";

const CustomErrorComponent: NextPage<ErrorProps> = props => {
  return (
    <p> Custom 500 page from pages/_error </p>
  );
};

CustomErrorComponent.getInitialProps = async contextData => {
  // In case this is running in a serverless function, await this in order to give
  // time to send the error before the lambda exits
  console.log("reporting error to error service:")


  // This will contain the status code of the response
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
