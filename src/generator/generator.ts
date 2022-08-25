import AdmZip from "adm-zip";
import { defaultTimeoutInMs, defaultTryLimits } from "../constant";
import { fetchZipFromUrl, renderTemplateFileName } from "../util";
import fs from "fs-extra";
import path from "path";
import { renderTemplateContent } from "../util";

export class Generator {
    url!: string;
    path!: string;
    renderView!: { [key: string]: string };
    constructor(input: Input) {
    }
    async generate() {
        const zip = await this.download(this.url);
        await this.unzip(zip);
    }
    async download(url: string): Promise<AdmZip> {
        console.log("downloading...");
        return await fetchZipFromUrl(url, defaultTryLimits, defaultTimeoutInMs);
    }
    async unzip(zip: AdmZip) {
        console.log("unzipping and rendering...");
        const entries: AdmZip.IZipEntry[] = zip.getEntries().filter((entry) => !entry.isDirectory);
        for (const entry of entries) {
            const rawEntryData: Buffer = entry.getData();
            const entryName = renderTemplateFileName(entry.entryName, this.renderView);
            const entryData = renderTemplateContent(entryName, rawEntryData, this.renderView);
            const filePath: string = path.join(this.path, entryName);
            const dirPath: string = path.dirname(filePath);
            await fs.ensureDir(dirPath);
            await fs.writeFile(filePath, entryData);
        }
    }
}