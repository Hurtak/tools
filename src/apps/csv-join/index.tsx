import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  DataList,
  Flex,
  Heading,
  Layout,
  Separator,
  Text,
  TextArea,
} from "../../ui/index.ts";
import { type ChangeEvent, useMemo, useState } from "react";
import { createFileId, formatBytes, joinCsvTexts } from "./domain.ts";
import { type AppMetadata } from "../types.ts";

type CsvFile = {
  id: string;
  file: File;
};

type JoinResult = {
  content: string;
  fileCount: number;
};

export const metadata: AppMetadata = {
  name: "CSV Join",
  description: "Join CSV files in order while keeping the first header row.",
};

export const App = () => {
  const [csvFiles, setCsvFiles] = useState<CsvFile[]>([]);
  const [joinResult, setJoinResult] = useState<JoinResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const totalSize = useMemo(
    () => csvFiles.reduce((sum, item) => sum + item.file.size, 0),
    [csvFiles],
  );

  const addFiles = (files: FileList | null) => {
    const selectedFiles = Array.from(files ?? []);
    if (selectedFiles.length === 0) {
      return;
    }

    setCsvFiles((currentFiles) => [
      ...currentFiles,
      ...selectedFiles.map((file) => ({ file, id: createFileId(file) })),
    ]);
    setJoinResult(null);
    setErrorMessage(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(event.currentTarget.files);
    event.currentTarget.value = "";
  };

  const removeFile = (id: string) => {
    setCsvFiles((currentFiles) => currentFiles.filter((item) => item.id !== id));
    setJoinResult(null);
    setErrorMessage(null);
  };

  const clearFiles = () => {
    setCsvFiles([]);
    setJoinResult(null);
    setErrorMessage(null);
  };

  const joinCsvs = async () => {
    if (csvFiles.length === 0) {
      setErrorMessage("Add at least one CSV file before joining.");
      return;
    }

    try {
      const csvTexts = await Promise.all(csvFiles.map(({ file }) => file.text()));
      setJoinResult({
        content: joinCsvTexts(csvTexts),
        fileCount: csvFiles.length,
      });
      setErrorMessage(null);
    } catch (error) {
      setJoinResult(null);
      setErrorMessage(error instanceof Error ? error.message : "Could not join the selected CSV files.");
    }
  };

  const downloadJoinedCsv = () => {
    if (!joinResult) {
      return;
    }

    const url = URL.createObjectURL(new Blob([joinResult.content], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "joined.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout
      subtitle="Drop several CSV files, keep the first header, and append every later file without its header row."
      title="CSV Join"
    >
      <Flex direction="column" gap="4">
        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading as="h2" size="4">
              Add CSV files
            </Heading>
            <Text as="p" color="gray">
              Multiple files are supported. Files are joined in the order they are added.
            </Text>
            <input accept=".csv,text/csv" multiple onChange={handleFileChange} type="file" />
          </Flex>
        </Card>

        <Card size="3">
          <Flex direction="column" gap="4">
            <Flex align="start" direction={{ initial: "column", sm: "row" }} gap="3" justify="between">
              <Box>
                <Heading as="h2" size="4">
                  Added CSVs
                </Heading>
                <Text as="p" color="gray">
                  Files are joined in this order.
                </Text>
              </Box>
              {csvFiles.length > 0
                ? (
                  <Button color="red" onClick={clearFiles} variant="soft">
                    Clear
                  </Button>
                )
                : null}
            </Flex>

            {csvFiles.length === 0
              ? <Text color="gray">No CSV files added yet.</Text>
              : (
                <Flex direction="column" gap="4">
                  <DataList.Root>
                    <DataList.Item>
                      <DataList.Label>Files</DataList.Label>
                      <DataList.Value>{csvFiles.length}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label>Total size</DataList.Label>
                      <DataList.Value>{formatBytes(totalSize)}</DataList.Value>
                    </DataList.Item>
                  </DataList.Root>

                  <Button onClick={joinCsvs}>Join CSV</Button>

                  <Flex direction="column" gap="3">
                    {csvFiles.map(({ file, id }, index) => (
                      <Flex direction="column" gap="3" key={id}>
                        <Flex align="start" direction={{ initial: "column", sm: "row" }} gap="3" justify="between">
                          <Flex direction="column" gap="1">
                            <Flex align="center" gap="2" wrap="wrap">
                              <Text weight="medium">{file.name}</Text>
                              <Badge color={index === 0 ? "blue" : "gray"}>
                                {index === 0 ? "Header source" : "Header removed"}
                              </Badge>
                            </Flex>
                            <Text color="gray" size="2">
                              {formatBytes(file.size)}
                            </Text>
                          </Flex>
                          <Button
                            aria-label={`Remove ${file.name}`}
                            color="red"
                            onClick={() => removeFile(id)}
                            variant="ghost"
                          >
                            Remove
                          </Button>
                        </Flex>
                        {index < csvFiles.length - 1 ? <Separator /> : null}
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              )}
          </Flex>
        </Card>

        {errorMessage
          ? (
            <Callout.Root color="red">
              <Callout.Text>{errorMessage}</Callout.Text>
            </Callout.Root>
          )
          : null}

        {joinResult
          ? (
            <Card size="3">
              <Flex direction="column" gap="3">
                <Flex align="start" direction={{ initial: "column", sm: "row" }} gap="3" justify="between">
                  <Heading as="h2" size="4">
                    Joined CSV
                  </Heading>
                  <Button onClick={downloadJoinedCsv}>Download</Button>
                </Flex>
                <Callout.Root color="green">
                  <Callout.Text>
                    Joined {joinResult.fileCount} CSV file{joinResult.fileCount === 1 ? "" : "s"}.
                  </Callout.Text>
                </Callout.Root>
                <TextArea readOnly resize="vertical" rows={14} value={joinResult.content} />
              </Flex>
            </Card>
          )
          : null}
      </Flex>
    </Layout>
  );
};
