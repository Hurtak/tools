import { Card, type CardProps } from "antd";

export type PageCardProps = CardProps;

export const PageCard = ({ children, variant = "outlined", ...cardProps }: PageCardProps) => (
  <Card variant={variant} {...cardProps}>
    {children}
  </Card>
);
