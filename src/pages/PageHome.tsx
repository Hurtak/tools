import { Link } from "react-router";
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
    icon: <FileTextOutlined style={{ color: "#2563eb", fontSize: 22 }} />,
    path: "/csv-join",
    title: "CSV Join",
  },
  {
    description: "Small placeholder app for the next tool.",
    icon: <ToolOutlined style={{ color: "#2563eb", fontSize: 22 }} />,
    path: "/app1",
    title: "app1",
  },
];

export const PageHome = () => (
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
          key={tool.path}
          title={
            <Space size={10}>
              {tool.icon}
              <span>{tool.title}</span>
            </Space>
          }
        >
          <Text type="secondary">{tool.description}</Text>
          <div style={{ marginTop: "auto", paddingTop: 24 }}>
            <Link to={tool.path}>
              <Button icon={<ArrowRightOutlined />} type="primary">
                Open
              </Button>
            </Link>
          </div>
        </PageCard>
      ))}
    </div>
  </Layout>
);
