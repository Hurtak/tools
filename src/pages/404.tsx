import NextLink from "next/link";
import { Button, Card, Flex, Heading, Layout, Text } from "../ui/index.ts";

const PageNotFound = () => (
  <Layout title="Page not found" subtitle="The page you requested does not exist.">
    <Card size="3">
      <Flex direction="column" gap="3">
        <Heading as="h2" size="8">
          404
        </Heading>
        <Text as="p" color="gray">
          This tool is out of reach. Check the address, or return to the tools list to choose an available app.
        </Text>
        <Button asChild>
          <NextLink href="/">Back to tools</NextLink>
        </Button>
      </Flex>
    </Card>
  </Layout>
);

export default PageNotFound;
