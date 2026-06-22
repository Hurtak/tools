import {
  ArrowRightOutlined,
  Button,
  FileTextOutlined,
  Layout,
  PageCard,
  Space,
  ToolOutlined,
  Typography,
} from "../ui/index.ts";

const { Text } = Typography;

const PageHome = () => (
  <Layout title="Tools" subtitle="A small collection of tools running in your browser.">
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
      }}
    >
      <PageCard
        styles={{ body: { display: "flex", flexDirection: "column", minHeight: 156 } }}
        title={
          <Space size={10}>
            <FileTextOutlined style={{ color: "#2563eb", fontSize: 22 }} />
            <span>CSV Join</span>
          </Space>
        }
      >
        <Text type="secondary">Join CSV files in order while keeping the first header row.</Text>
        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <Button href="csv-join/" icon={<ArrowRightOutlined />} type="primary">
            Open
          </Button>
        </div>
      </PageCard>

      <PageCard
        styles={{ body: { display: "flex", flexDirection: "column", minHeight: 156 } }}
        title={
          <Space size={10}>
            <ToolOutlined style={{ color: "#2563eb", fontSize: 22 }} />
            <span>example</span>
          </Space>
        }
      >
        <Text type="secondary">Placeholder app.</Text>
        <div style={{ marginTop: "auto", paddingTop: 24 }}>
          <Button href="example/" icon={<ArrowRightOutlined />} type="primary">
            Open
          </Button>
        </div>
      </PageCard>
    </div>
  </Layout>
);

export default PageHome;
