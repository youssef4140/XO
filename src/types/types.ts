type Tile = {
    symbol: 'X' | 'O' | null,
    turns: number
}
export type Game = {
    players: Record<string, 'X' | 'O'>;
    turn: 'X' | 'O';
    tiles: Tile[]
}

export type Room = {
    players: Record<string, 'X' | 'O'>;
    ready: boolean;
    playerCount: number;
    id: string;
    game: Game | null;

}