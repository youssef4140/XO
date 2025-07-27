import { room, setGame, setRoom, setSign } from "@/stores/roomStore";
import type { Game, Room } from "@/types/types";
import { useRouter } from "vue-router";
import { winner } from "@/views/GameBoard.vue"
export function listenForRoomEvents(socket: any) {

  const router = useRouter();

  function navigateToGameIfReady(room: Room) {
    room.ready ? router.push('/game') : router.push('/')
  }
  socket.on("roomCreated", (r: { room: Room }) => {
    console.log("Room created:", r.room);
    setRoom(r.room);
    console.log(room)
  });

  socket.on("roomJoined", (r: { room: Room }) => {
    console.log("Joined room:", r.room);
    setRoom(r.room);
    console.log(room)
    navigateToGameIfReady(r.room)


  });

  socket.on("roomLeft", (r: { room: Room }) => {
    console.log("Left room:", r.room);
    setRoom(r.room);
    navigateToGameIfReady(r.room)


  });

  socket.on("roomUpdated", (r: { room: Room }) => {
    setRoom(r.room);
    navigateToGameIfReady(r.room)

  });

  socket.on("playerLeft", (r: { room: Room }) => {
    setRoom(r.room);
    router.push('/')


  });

  socket.on('roomReady', (r: { room: Room, sign: 'X' | 'O' }) => {
    setRoom(r.room);
    setSign(r.sign);
  })

  socket.on('error', (err: string) => {
    console.warn(err)
  })

  socket.on('tik', (g: { game: Game }) => {
    setGame(g.game);
  })


  socket.on('winner', (w: 'X' | 'O') => {
    winner.value?.setWinner(w);
  });

  socket.on('newGame', (g: { game: Game, sign: 'X' | 'O' }) => {
    setGame(g.game);
    setSign(g.sign);

    winner.value?.setWinner(null);
    console.log(g.game, ' from room events')


  })
}