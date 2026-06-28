import { Button, Card, Flex, Grid, Heading, Layout, Text } from "../ui/index.ts";
import NextLink from "next/link";

const PageHome = () => (
  <Layout title="Tools" subtitle="A small collection of tools running in your browser.">
    <Grid columns={{ initial: "1", sm: "2" }} gap="4">
      <Card size="3">
        <Flex direction="column" gap="3">
          <Heading as="h2" size="5">
            CSV Join
          </Heading>
          <Text as="p" color="gray">
            Join CSV files in order while keeping the first header row.
          </Text>
          <Button asChild>
            <NextLink href="/csv-join/">
              Open
            </NextLink>
          </Button>
        </Flex>
      </Card>

      <Card size="3">
        <Flex direction="column" gap="3">
          <Heading as="h2" size="5">
            Example
          </Heading>
          <Text as="p" color="gray">
            Placeholder app.
          </Text>
          <Button asChild>
            <NextLink href="/example/">
              Open
            </NextLink>
          </Button>
        </Flex>
      </Card>
    </Grid>
  </Layout>
);

export default PageHome;
