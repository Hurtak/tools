import { Layout, PageCard, Typography } from "../../ui/index.ts";
import { type AppMetadata } from "../types.ts";

const { Paragraph } = Typography;

export const metadata: AppMetadata = {
  name: "Example",
  description: "Example App",
};

export const App = () => (
  <Layout title="Example">
    <PageCard>
      <Paragraph>Example App</Paragraph>
    </PageCard>
  </Layout>
);
