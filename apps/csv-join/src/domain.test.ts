import { createFileId, findFirstRecordEnd, formatBytes, joinCsvTexts } from "./domain.ts";

const assertEquals = (actual: unknown, expected: unknown) => {
  if (actual !== expected) {
    throw new Error(`Expected ${String(expected)}, received ${String(actual)}`);
  }
};

Deno.test("joinCsvTexts keeps the first header and removes later headers", () => {
  assertEquals(
    joinCsvTexts([
      "name,age\nAda,36\nGrace,85\n",
      "name,age\nLinus,56\nMargaret,88\n",
      "name,age\nKatherine,101\n",
    ]),
    "name,age\nAda,36\nGrace,85\nLinus,56\nMargaret,88\nKatherine,101",
  );
});

Deno.test("joinCsvTexts handles CRLF and byte order marks at file boundaries", () => {
  assertEquals(
    joinCsvTexts([
      "\uFEFFname,age\r\nAda,36\r\n",
      "\uFEFFname,age\r\nLinus,56\r\n",
    ]),
    "name,age\r\nAda,36\nLinus,56",
  );
});

Deno.test("joinCsvTexts ignores newlines inside quoted header cells", () => {
  assertEquals(
    joinCsvTexts([
      '"name\nlabel",age\nAda,36',
      '"name\nlabel",age\nLinus,56',
    ]),
    '"name\nlabel",age\nAda,36\nLinus,56',
  );
});

Deno.test("joinCsvTexts rejects empty CSV files", () => {
  try {
    joinCsvTexts(["name,age\nAda,36", "\n"]);
  } catch (error) {
    assertEquals(error instanceof Error ? error.message : "", "CSV 2 is empty.");
    return;
  }

  throw new Error("Expected empty CSV to throw");
});

Deno.test("findFirstRecordEnd returns the first record boundary", () => {
  assertEquals(findFirstRecordEnd("a,b\r\n1,2"), 5);
  assertEquals(findFirstRecordEnd('"a\nb",c\n1,2'), 8);
});

Deno.test("createFileId includes stable file metadata and a generated suffix", () => {
  const file = new File(["abc"], "people.csv", { lastModified: 1234, type: "text/csv" });
  const id = createFileId(file);

  if (!id.startsWith("people.csv-3-1234-")) {
    throw new Error(`Unexpected file id: ${id}`);
  }
});

Deno.test("formatBytes formats bytes, kilobytes, and megabytes", () => {
  assertEquals(formatBytes(512), "512 B");
  assertEquals(formatBytes(1024), "1.0 KB");
  assertEquals(formatBytes(1536), "1.5 KB");
  assertEquals(formatBytes(1024 * 1024), "1.0 MB");
});
