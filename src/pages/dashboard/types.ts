import { PageModuleState } from "@/store/page-state/types";

export interface DocumentListType {
  moduleID: "documentList";
  filter: string;
  items: DocumentItemType[] | undefined;
  moduleState: PageModuleState;
}

export interface DocumentViewType {
  moduleID: "documentView";
  item: undefined | DocumentItemType;
}

export interface DocumentItemType {
  description: string;
  id: number;
  image: string | null;
  name: string;
}
