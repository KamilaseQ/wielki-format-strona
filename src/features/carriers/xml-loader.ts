import { promises as fs } from "node:fs";
import path from "node:path";

export const DEFAULT_CARRIERS_DATA_FILE = path.join(
  "data",
  "billboard_data_full.xml"
);

export async function readCarriersXml(): Promise<string> {
  const dataFile = process.env.CARRIERS_DATA_FILE ?? DEFAULT_CARRIERS_DATA_FILE;
  const xmlPath = path.isAbsolute(dataFile)
    ? dataFile
    : path.join(process.cwd(), dataFile);

  const buffer = await fs.readFile(xmlPath);
  const declaration = buffer.subarray(0, 192).toString("ascii");
  const encoding = declaration.match(/encoding=["']([^"']+)["']/i)?.[1]
    ?.trim()
    .toLowerCase();

  if (encoding === "windows-1250" || encoding === "cp1250") {
    return new TextDecoder("windows-1250").decode(buffer);
  }

  return new TextDecoder("utf-8").decode(buffer);
}
