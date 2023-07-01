import { PageModules } from "@/store/page-state/types";

export interface ValidateConfig {
  acceptableStatusCode: number;
  defaultErrorMessage?: string;
  invisibleLoading?: boolean;
  pageModuleID?: keyof PageModules;
  validatorFunction?: (data: unknown) => void;
}

export interface ApiResponse {
  [prop: string]: any;
}
