import type { Room } from "@/types/types";
import { reactive, ref } from "vue";

const room = reactive<Room>({
  id: '',
  playerCount: 0,
  ready: false,
  players: {},
  game:null
})

const sign = ref<'X' | 'O' | null>(null);

function setRoom(r: Room) {
  room.id = r.id;
  room.playerCount = r.playerCount;
  room.ready = r.ready;
  room.players = r.players;
  room.game = r.game;


}

function setSign(l: 'X' | 'O') {
  sign.value = l
}



export { room,sign, setRoom, setSign }