export interface PageState {
  currentWidth: number;
  error: boolean;
  loading: boolean;
  feedback: boolean;
  message: string;
  modules: PageModules;
}

export interface PageModules {
  [id: string | number]: PageModuleState;
}

export interface PageModuleState {
  error: boolean;
  loading: boolean;
  message: string;
}
