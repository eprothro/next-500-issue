/** Add your relevant code here for the issue to reproduce */
import { InferGetServerSidePropsType, NextPage } from "next";

export async function getServerSideProps() {
  console.log('about to throw error from index/getServerSideProps');
  throw new Error('a test error has been manually triggered');
}

const TestServerSideErrorPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  return (
    <>
      <p>server side error test page</p>
    </>
  );
};

export default TestServerSideErrorPage;
