import { Card, Layout, Text } from "../../ui/index.ts";
import { type AppMetadata } from "../types.ts";

export const metadata: AppMetadata = {
  name: "Example",
  description: "Example App",
};

export const App = () => (
  <Layout title="Example">
    <Card size="3">
      <Text as="p">Example App</Text>
    </Card>
  </Layout>
);
