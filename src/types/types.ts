export type Room = {
    players: Record<string, 'X' | 'O'>;
    ready:boolean;
    playerCount: number;
    id:string;
    // game?: GameManager;

}