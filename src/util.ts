import axios, { AxiosResponse, CancelToken } from "axios";
import AdmZip from "adm-zip";
import path from "path";
import Mustache from "mustache";
import { templateFileExt } from "./constant";

export async function fetchZipFromUrl(
    url: string,
    tryLimits: number,
    timeoutInMs: number
): Promise<AdmZip> {
    const res: AxiosResponse<any> = await sendRequestWithTimeout(
        async (cancelToken) => {
            return await axios.get(url, {
                responseType: "arraybuffer",
                cancelToken: cancelToken,
            });
        },
        timeoutInMs,
        tryLimits
    );

    const zip = new AdmZip(res.data);
    return zip;
}

export async function sendRequestWithTimeout<T>(
    requestFn: (cancelToken: CancelToken) => Promise<AxiosResponse<T>>,
    timeoutInMs: number,
    tryLimits = 1
): Promise<AxiosResponse<T>> {
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => {
        source.cancel();
    }, timeoutInMs);
    try {
        const res = await sendRequestWithRetry(() => requestFn(source.token), tryLimits);
        clearTimeout(timeout);
        return res;
    } catch (err: unknown) {
        if (axios.isCancel(err)) {
            throw new Error("Request timeout");
        }
        throw err;
    }
}

export async function sendRequestWithRetry<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    tryLimits: number
): Promise<AxiosResponse<T>> {
    // !status means network error, see https://github.com/axios/axios/issues/383
    const canTry = (status: number | undefined) => !status || (status >= 500 && status < 600);

    let status: number | undefined;
    let error: Error;

    for (let i = 0; i < tryLimits && canTry(status); i++) {
        try {
            const res = await requestFn();
            if (res.status === 200 || res.status === 201) {
                return res;
            }

            error = new Error(`HTTP Request failed: ${JSON.stringify(res)}`);
            status = res.status;
        } catch (e: any) {
            error = e;
            status = e?.response?.status;
        }
    }

    error ??= new Error(`RequestWithRetry got bad tryLimits: ${tryLimits}`);
    throw error;
}

export function renderTemplateContent(
    filePath: string,
    data: Buffer,
    variables: { [key: string]: string }
): string | Buffer {
    if (path.extname(filePath) === templateFileExt) {
    return Mustache.render(data.toString(), variables);
    }
    // Return Buffer instead of string if the file is not a template. Because `toString()` may break binary resources, like png files.
    return data;
}

export function renderTemplateFileName(
    data: string,
    variables: { [key: string]: string }
): string {
    return Mustache.render(data, variables);
}