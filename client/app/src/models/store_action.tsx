import { UserSettings } from "./settings";
import { AppPage } from "./app_page";

export interface StoreAction {
    type: string,
    value: UserSettings | string | AppPage,
    
  }