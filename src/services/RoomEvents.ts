import { room, setRoom, setSign } from "@/stores/roomStore";
import type { Room } from "@/types/types";
import { useRouter } from "vue-router";

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
    console.log("Room updated:", r.room);
    setRoom(r.room);
    console.log(room)
    navigateToGameIfReady(r.room)

  });

  socket.on("playerLeft", (r: { room: Room }) => {
    console.log("Room updated:", r.room);
    setRoom(r.room);
    console.log(room)
    navigateToGameIfReady(r.room)


  });

  socket.on('roomReady',(r:{room:Room,sign:'X'|'O'})=>{
    setRoom(r.room);
    setSign(r.sign);
  })

  socket.on('error', (err: string) => {
    console.warn(err)
  })
}