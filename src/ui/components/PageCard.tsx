import { Card } from "antd";
import { type CSSProperties, type ReactNode } from "react";

export type PageCardProps = {
  children: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  style?: CSSProperties;
  styles?: {
    body?: CSSProperties;
  };
};

export const PageCard = ({ children, extra, style, styles, title }: PageCardProps) => (
  <Card
    extra={extra}
    style={{
      borderColor: "#e6e8eb",
      borderRadius: 8,
      boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
      ...style,
    }}
    styles={{
      ...styles,
      body: { padding: 24, ...styles?.body },
    }}
    title={title}
  >
    {children}
  </Card>
);
