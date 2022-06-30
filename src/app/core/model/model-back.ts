import { Genre, LinkType } from "./enum-front";
import { v4 as uuid } from 'uuid';

export class Game {
    id?: typeof uuid;
    steamId!: number;
    name!: string;
    genre!: Genre;
}

export interface Steam {
    appid: number;
    name: string;
}

export interface LinkBack {
    id: typeof uuid;
    gameId: typeof uuid;
    linkType: LinkType;
    link: string;
}

export interface AccessToken {
    accessToken: string;
}