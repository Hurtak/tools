import { Button, HomeOutlined, Layout, PageCard, Space, Typography } from "../ui/index.ts";

const { Paragraph, Text, Title } = Typography;

const PageNotFound = () => (
  <Layout title="Page not found" subtitle="The page you requested does not exist.">
    <PageCard
      styles={{
        body: {
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minHeight: 280,
          textAlign: "center",
        },
      }}
    >
      <Space orientation="vertical" size={4}>
        <Text strong style={{ color: "#2563eb", fontSize: 18 }}>
          404
        </Text>
        <Title level={3} style={{ fontSize: 22, letterSpacing: 0, lineHeight: 1.25, margin: 0 }}>
          This tool is out of reach
        </Title>
      </Space>
      <Paragraph style={{ margin: 0, maxWidth: 480 }}>
        Check the address, or return to the tools list to choose an available app.
      </Paragraph>
      <Button href="/tools/" icon={<HomeOutlined />} type="primary">
        Back to tools
      </Button>
    </PageCard>
  </Layout>
);

export default PageNotFound;
