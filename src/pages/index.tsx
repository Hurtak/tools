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

const tools = [
  {
    description: "Join CSV files in order while keeping the first header row.",
    href: "csv-join/",
    icon: <FileTextOutlined style={{ color: "#2563eb", fontSize: 22 }} />,
    title: "CSV Join",
  },
  {
    description: "Small placeholder app for the next tool.",
    href: "app1/",
    icon: <ToolOutlined style={{ color: "#2563eb", fontSize: 22 }} />,
    title: "app1",
  },
];

const PageHome = () => (
  <Layout subtitle="A small collection of browser tools." title="Tools">
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
      }}
    >
      {tools.map((tool) => (
        <PageCard
          bodyStyle={{ display: "flex", flexDirection: "column", minHeight: 156 }}
          key={tool.href}
          title={
            <Space size={10}>
              {tool.icon}
              <span>{tool.title}</span>
            </Space>
          }
        >
          <Text type="secondary">{tool.description}</Text>
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <Button href={tool.href} icon={<ArrowRightOutlined />} type="primary">
              Open
            </Button>
          </div>
        </PageCard>
      ))}
    </div>
  </Layout>
);

export default PageHome;
