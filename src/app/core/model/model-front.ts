import { HeroIconName } from "ng-heroicon";
import { v4 as uuid } from 'uuid';
export interface SidebarItem {
    url: string;
    icon: HeroIconName;
    label: string;
    roles: string[]
}

export class Page<T> {
    content!: T;
    totalPages!: number;
    totalElements!: number;
}

export interface GameResponse {
    id: typeof uuid;
    steamId: number;
    name: string;
    genre: string;
}

export interface Icon {
    icon: HeroIconName
}