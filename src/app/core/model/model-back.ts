import { Genre } from "./enum-front";
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