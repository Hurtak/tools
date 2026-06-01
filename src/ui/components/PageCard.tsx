import { Card } from "antd";
import { CSSProperties, ReactNode } from "react";

export type PageCardProps = {
  children: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
};

export const PageCard = ({ bodyStyle, children, extra, style, title }: PageCardProps) => (
  <Card
    bodyStyle={{ padding: 24, ...bodyStyle }}
    extra={extra}
    style={{
      borderColor: "#e6e8eb",
      borderRadius: 8,
      boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
      ...style,
    }}
    title={title}
  >
    {children}
  </Card>
);
