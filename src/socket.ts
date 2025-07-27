import { reactive } from "vue";
import { io } from "socket.io-client";

const state = reactive({
  connected: false,

});

// const URL = "http://localhost:3000";
const URL = import.meta.env.BASE_URL;
// const URL = "https://tictactwo.onrender.com/"

export const socket = io(URL);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

export default socket;

