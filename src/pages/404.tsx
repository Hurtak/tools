import NextLink from "next/link";
import { Button, HomeOutlined, Layout, PageCard, Result } from "../ui/index.ts";

const PageNotFound = () => (
  <Layout title="Page not found" subtitle="The page you requested does not exist.">
    <PageCard>
      <Result
        extra={
          <NextLink passHref href="/">
            <Button icon={<HomeOutlined />} type="primary">
              Back to tools
            </Button>
          </NextLink>
        }
        status="404"
        subTitle="This tool is out of reach. Check the address, or return to the tools list to choose an available app."
        title="404"
      />
    </PageCard>
  </Layout>
);

export default PageNotFound;
