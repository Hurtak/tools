import { Box, Container, Flex, Heading, Separator, Text } from "./radix-components.tsx";
// @deno-types="../../types/next-head.d.ts"
import NextHead from "next/head";
import { type ReactNode } from "react";

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
  <Box>
    <NextHead>
      <title>{title ? `${title} - Tools` : "Tools"}</title>
    </NextHead>

    <Box asChild py="5">
      <header>
        <Container size="3">
          <Flex direction="column" gap="3">
            <Text color="gray" weight="bold">
              Hurtak's Tools
            </Text>
            {title ? <Heading as="h1" size="7">{title}</Heading> : null}
            {subtitle
              ? (
                <Text as="p" color="gray">
                  {subtitle}
                </Text>
              )
              : null}
            {actions ? <Flex gap="2" wrap="wrap">{actions}</Flex> : null}
          </Flex>
        </Container>
      </header>
    </Box>

    <Separator size="4" />

    <Box asChild py="5">
      <main>
        <Container size="3">
          {children}
        </Container>
      </main>
    </Box>
  </Box>
);
