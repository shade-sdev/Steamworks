import { HeroIconName } from "ng-heroicon";

export interface SidebarItem {
    url: string;
    icon: HeroIconName;
    label: string;
    roles: string[]
}