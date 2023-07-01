import axios, { AxiosRequestConfig } from "axios";

import { userPageStateStore } from "@/store/page-state/page-state.store";

import { PageModules } from "@/store/page-state/types";
import { ValidateConfig } from "./types";

const pageStateStore = userPageStateStore();

export async function apiResponse(
  axiosConfig: AxiosRequestConfig,
  validateConfig: ValidateConfig = {
    acceptableStatusCode: 200,
  }
): Promise<unknown> {
  if (!validateConfig?.invisibleLoading) {
    setLoadingState(validateConfig?.pageModuleID);
  }

  try {
    const result = await axios(axiosConfig);

    if (
      !result ||
      result.status !== validateConfig.acceptableStatusCode ||
      !result?.data
    ) {
      throw new Error(validateConfig.defaultErrorMessage);
    }

    if (validateConfig?.validatorFunction) {
      validateConfig.validatorFunction(result.data);
    }

    removeErrorState(validateConfig?.pageModuleID);

    return result.data;
  } catch (error: unknown) {
    console.log(error);

    let errorMessage = validateConfig?.defaultErrorMessage;

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    setErrorState(validateConfig?.pageModuleID, errorMessage);
  } finally {
    removeLoadingState(validateConfig?.pageModuleID);
  }
}

function setLoadingState(moduleID: keyof PageModules | undefined): void {
  if (moduleID) {
    pageStateStore.moduleStartLoading(moduleID);
  } else {
    pageStateStore.pageStartLoading();
  }
}

function removeLoadingState(moduleID: keyof PageModules | undefined): void {
  if (moduleID) {
    pageStateStore.moduleEndLoading(moduleID);
  } else {
    pageStateStore.pageEndLoading();
  }
}

function setErrorState(
  moduleID: keyof PageModules | undefined,
  message: string | undefined = undefined
): void {
  if (moduleID) {
    pageStateStore.createModuleError(moduleID, message);
  } else {
    pageStateStore.createPageError(message);
  }
}

function removeErrorState(moduleID: keyof PageModules | undefined): void {
  if (moduleID) {
    pageStateStore.removeModuleError(moduleID);
  } else {
    pageStateStore.removePageError();
  }
}
