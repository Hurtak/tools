import {
  ArrowRightOutlined,
  Button,
  Col,
  FileTextOutlined,
  Flex,
  Layout,
  PageCard,
  Row,
  Space,
  ToolOutlined,
  Typography,
} from "../ui/index.ts";

const { Text } = Typography;

const PageHome = () => (
  <Layout title="Tools" subtitle="A small collection of tools running in your browser.">
    <Row gutter={[16, 16]}>
      <Col md={12} xs={24}>
        <PageCard
          title={
            <Space size={10}>
              <FileTextOutlined />
              <span>CSV Join</span>
            </Space>
          }
        >
          <Flex gap={24} vertical>
            <Text type="secondary">Join CSV files in order while keeping the first header row.</Text>
            <Button href="csv-join/" icon={<ArrowRightOutlined />} type="primary">
              Open
            </Button>
          </Flex>
        </PageCard>
      </Col>

      <Col md={12} xs={24}>
        <PageCard
          title={
            <Space size={10}>
              <ToolOutlined />
              <span>example</span>
            </Space>
          }
        >
          <Flex gap={24} vertical>
            <Text type="secondary">Placeholder app.</Text>
            <Button href="example/" icon={<ArrowRightOutlined />} type="primary">
              Open
            </Button>
          </Flex>
        </PageCard>
      </Col>
    </Row>
  </Layout>
);

export default PageHome;
