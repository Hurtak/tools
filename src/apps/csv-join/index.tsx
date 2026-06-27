import {
  Alert,
  Avatar,
  Button,
  DeleteOutlined,
  DownloadOutlined,
  Empty,
  FileTextOutlined,
  Flex,
  InboxOutlined,
  Input,
  Layout,
  List,
  PageCard,
  PlusOutlined,
  Space,
  Statistic,
  Tag,
  Typography,
  Upload,
} from "../../ui/index.ts";
import { useMemo, useState } from "react";
import { createFileId, formatBytes, joinCsvTexts } from "./domain.ts";
import { AppMetadata } from "../types.ts";

const { Dragger } = Upload;
const { Text, Title } = Typography;
const { TextArea } = Input;

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

  const uploadProps = {
    accept: ".csv,text/csv",
    beforeUpload: (file: File) => {
      setCsvFiles((currentFiles) => [...currentFiles, { file, id: createFileId(file) }]);
      setJoinResult(null);
      setErrorMessage(null);
      return Upload.LIST_IGNORE;
    },
    multiple: true,
    showUploadList: false,
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
      <Flex gap={16} vertical>
        <PageCard>
          <Dragger {...uploadProps}>
            <Flex align="center" gap={12} vertical>
              <InboxOutlined />
              <Title level={4}>Drop CSV files here</Title>
              <Text type="secondary">Multiple files are supported. Files are joined in the order they are added.</Text>
            </Flex>
          </Dragger>
        </PageCard>

        <PageCard
          extra={csvFiles.length > 0
            ? (
              <Button icon={<DeleteOutlined />} onClick={clearFiles}>
                Clear
              </Button>
            )
            : null}
          title="Added CSVs"
        >
          {csvFiles.length === 0
            ? <Empty description="No CSV files added yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            : (
              <Flex gap={16} vertical>
                <Flex align="center" gap={12} justify="space-between" wrap>
                  <Space size={16} wrap>
                    <Statistic title="Files" value={csvFiles.length} />
                    <Statistic title="Total size" value={formatBytes(totalSize)} />
                  </Space>
                  <Button icon={<PlusOutlined />} onClick={joinCsvs} type="primary">
                    Join CSV
                  </Button>
                </Flex>
                <List
                  dataSource={csvFiles}
                  renderItem={({ file, id }, index) => (
                    <List.Item
                      actions={[
                        <Button
                          aria-label={`Remove ${file.name}`}
                          icon={<DeleteOutlined />}
                          key="remove"
                          onClick={() => removeFile(id)}
                          type="text"
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<FileTextOutlined />} shape="square" size="small" />}
                        description={formatBytes(file.size)}
                        title={
                          <Space size={8} wrap>
                            <Text>{file.name}</Text>
                            {index === 0 ? <Tag color="blue">Header source</Tag> : <Tag>Header removed</Tag>}
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Flex>
            )}
        </PageCard>

        {errorMessage ? <Alert message={errorMessage} showIcon type="error" /> : null}

        {joinResult
          ? (
            <PageCard
              extra={
                <Button icon={<DownloadOutlined />} onClick={downloadJoinedCsv} type="primary">
                  Download
                </Button>
              }
              title="Joined CSV"
            >
              <Flex gap={12} vertical>
                <Alert
                  message={`Joined ${joinResult.fileCount} CSV file${joinResult.fileCount === 1 ? "" : "s"}.`}
                  showIcon
                  type="success"
                />
                <TextArea readOnly rows={14} value={joinResult.content} variant="filled" />
              </Flex>
            </PageCard>
          )
          : null}
      </Flex>
    </Layout>
  );
};
