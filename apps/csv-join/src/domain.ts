const removeByteOrderMark = (text: string) => text.replace(/^\uFEFF/, "");

const trimCsvBoundary = (text: string) => text.replace(/^[\r\n]+|[\r\n]+$/g, "");

export const createFileId = (file: File) => {
  const randomId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
  return `${file.name}-${file.size}-${file.lastModified}-${randomId}`;
};

export const findFirstRecordEnd = (csv: string) => {
  let inQuotes = false;

  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];

    if (char === '"') {
      if (inQuotes && csv[index + 1] === '"') {
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (char === "\n" || char === "\r")) {
      return char === "\r" && csv[index + 1] === "\n" ? index + 2 : index + 1;
    }
  }

  return csv.length;
};

export const joinCsvTexts = (csvTexts: string[]) => {
  const joinedParts = csvTexts.map((rawText, index) => {
    const csv = trimCsvBoundary(removeByteOrderMark(rawText));

    if (!csv) {
      throw new Error(`CSV ${index + 1} is empty.`);
    }

    if (index === 0) {
      return csv;
    }

    const firstRecordEnd = findFirstRecordEnd(csv);
    return trimCsvBoundary(csv.slice(firstRecordEnd));
  });

  return joinedParts.filter(Boolean).join("\n");
};

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  const kilobytes = bytes / 1024;
  if (kilobytes < 1024) {
    return `${kilobytes.toFixed(1)} KB`;
  }

  return `${(kilobytes / 1024).toFixed(1)} MB`;
};
