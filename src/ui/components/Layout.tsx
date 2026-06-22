import { Layout as AntLayout } from "antd";
import { Space, Typography } from "./antd-components.tsx";
// @deno-types="../../types/next-head.d.ts"
import Head from "next/head";
import { type CSSProperties, type ReactNode } from "react";

const { Content, Header } = AntLayout;
const { Text, Title } = Typography;

export type LayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  maxWidth?: number | string;
  contentStyle?: CSSProperties;
};

export const Layout = ({
  actions,
  children,
  contentStyle,
  maxWidth = 1120,
  subtitle,
  title,
}: LayoutProps) => (
  <>
    <Head>
      <title>{`${title} - Tools`}</title>
    </Head>

    <AntLayout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          background: "#fff",
          borderBottom: "1px solid #e6e8eb",
          height: "auto",
          lineHeight: 1,
          paddingInline: 24,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            margin: "0 auto",
            maxWidth,
            minHeight: 64,
            paddingBlock: 14,
            width: "100%",
          }}
        >
          <Space orientation="vertical" size={4}>
            <Text strong style={{ color: "#2563eb", letterSpacing: 0 }}>
              Hurtak's Tools
            </Text>
            {title
              ? (
                <Title level={2} style={{ fontSize: 24, letterSpacing: 0, lineHeight: 1.2, margin: 0 }}>
                  {title}
                </Title>
              )
              : null}
            {subtitle ? <Text type="secondary">{subtitle}</Text> : null}
          </Space>
          {actions ? <Space wrap>{actions}</Space> : null}
        </div>
      </Header>
      <Content style={{ padding: 24, ...contentStyle }}>
        <div style={{ margin: "0 auto", maxWidth, width: "100%" }}>{children}</div>
      </Content>
    </AntLayout>
  </>
);
