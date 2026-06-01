import { Layout, PageCard, Typography } from "../../ui/index.ts";

const { Title } = Typography;

export const App = () => (
  <Layout title="app1">
    <PageCard>
      <Title level={3} style={{ letterSpacing: 0, margin: 0 }}>
        hello
      </Title>
    </PageCard>
  </Layout>
);
