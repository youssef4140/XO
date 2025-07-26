import type { Room } from "@/types/types";
import { reactive, ref } from "vue";

const room = reactive<Room>({
  id: '',
  playerCount: 0,
  ready: false,
  players: {}
})

function setRoom(r: Room) {
  room.id = r.id;
  room.playerCount = r.playerCount;
  room.ready = r.ready;
  room.players = r.players;
}

export { room, setRoom }