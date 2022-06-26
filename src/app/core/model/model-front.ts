import { HeroIconName } from "ng-heroicon";
import { v4 as uuid } from 'uuid';
import { LinkType } from "./enum-front";
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

export interface TableHeader {
    key: string,
    displayLabel: string
}

export interface Link {
    id: typeof uuid;
    linkType: LinkType;
    link: string;
}

export interface GameFull {
    id: typeof uuid;
    steamId: number;
    name: string;
    genre: string;
    image: string;
    links: Link[]
}