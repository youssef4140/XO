<script setup lang="ts">
import { onMounted, ref, computed, reactive } from 'vue';
import socket from '@/socket';
import { room } from '@/stores/roomStore';

let roomId = ref<string>("");


function createRoom() {
    socket.emit('createRoom');
    
}

function joinRoom() {
    socket.emit('joinRoom', roomId.value)
}
</script>

<template>
    <div class="container flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-8">

        <div class="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4 w-full max-w-md">
            <!-- Show room info when in a room -->
            <div v-if="room.id">
                <h1 class="text-xl font-semibold">You are in room <span class="text-indigo-400">{{ room.id }}</span></h1>
                <h2 class="text-lg">Player count: <span class="text-green-400">{{ room.playerCount }}</span></h2>
            </div>

            <!-- Show room controls when not in a room -->
            <div v-else class="w-full space-y-4">
                <h1 class="text-xl font-semibold text-center">Join or Create a Room</h1>
                
                <button
                    class="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
                    @click="createRoom()"
                >
                    Create Room
                </button>

                <input
                    type="text"
                    placeholder="Enter room ID"
                    class="w-full px-4 py-2 rounded border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    v-model="roomId"
                />

                <button
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
                    @click="joinRoom()"
                >
                    Join Room
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    color: white;
}
</style>