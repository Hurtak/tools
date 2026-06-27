import { Layout as AntLayout } from "antd";
import { Col, Flex, Row, Space, Typography } from "./antd-components.tsx";
// @deno-types="../../types/next-head.d.ts"
import NextHead from "next/head";
import { type ReactNode } from "react";

const { Content, Header } = AntLayout;
const { Text, Title } = Typography;

export type LayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
};

export const Layout = ({
  actions,
  children,
  subtitle,
  title,
}: LayoutProps) => (
  <AntLayout style={{ minHeight: "100vh" }}>
    <NextHead>
      <title>{`${title} - Tools`}</title>
    </NextHead>

    <Header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e6e8eb",
        height: "auto",
        lineHeight: 1,
        padding: "14px 0",
      }}
    >
      <Row align="middle" justify="center">
        <Col lg={22} md={21} xl={20} xs={22} xxl={16}>
          <Flex align="center" gap={16} justify="space-between" wrap>
            <Space orientation="vertical" size={4}>
              <Text strong style={{ color: "#2563eb" }}>
                Hurtak's Tools
              </Text>
              {title ? <Title level={2} style={{ margin: 0 }}>{title}</Title> : null}
              {subtitle ? <Text type="secondary">{subtitle}</Text> : null}
            </Space>
            {actions ? <Space wrap>{actions}</Space> : null}
          </Flex>
        </Col>
      </Row>
    </Header>

    <Content style={{ marginTop: "1rem" }}>
      <Row justify="center">
        <Col lg={22} md={21} xl={20} xs={22} xxl={16}>
          {children}
        </Col>
      </Row>
    </Content>
  </AntLayout>
);
