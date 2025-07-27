<script setup lang="ts">
import { onMounted, ref} from 'vue';
import socket from '@/socket';
import { room } from '@/stores/roomStore';
import { useRoute } from 'vue-router';

let roomId = ref<string>("");

const route = useRoute();

function createRoom() {
    socket.emit('createRoom');

}

function joinRoom() {
    socket.emit('joinRoom', roomId.value)
}
const copyButtonText = ref('Copy Invite Link');

const copyInviteLink = async () => {
    try {
        const inviteUrl = `${window.location.origin}/room/${room.id}`;
        await navigator.clipboard.writeText(inviteUrl);
        
        // Show success feedback
        copyButtonText.value = 'Copied!';
        setTimeout(() => {
            copyButtonText.value = 'Copy Invite Link';
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy link:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = `${window.location.origin}/room/${room.id}`;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyButtonText.value = 'Copied!';
        setTimeout(() => {
            copyButtonText.value = 'Copy Invite Link';
        }, 2000);
    }
};

onMounted(() => {
    // Check if we have a room ID in the route params
    if (route.params.roomId) {
        roomId.value = route.params.roomId as string;
        joinRoom();
    }
});
</script>

<template>
    <div class="container flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-8">

        <div class="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center space-y-4 w-full max-w-md">
            <!-- Show room info when in a room -->
            <div v-if="room.id" class="space-y-4">
                <div class="text-center space-y-2">
                    <h1 class="text-xl font-semibold">You are in room <span class="text-indigo-400">{{ room.id }}</span>
                    </h1>
                    <h2 class="text-lg">Player count: <span class="text-green-400">{{ room.playerCount }}</span></h2>
                    <p class="text-sm text-gray-400">Share the room ID or invite link for others to join!</p>
                </div>

                <!-- Copy Link Button -->
                <div class="flex justify-center">
                    <button @click="copyInviteLink"
                        class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 flex items-center space-x-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                            </path>
                        </svg>
                        <span>{{ copyButtonText }}</span>
                    </button>
                </div>
            </div>

            <!-- Show room controls when not in a room -->
            <div v-else class="w-full space-y-4">
                <h1 class="text-xl font-semibold text-center">Join or Create a Room</h1>

                <button
                    class="btn bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
                    @click="createRoom()">
                    Create Room
                </button>

                <input type="text" placeholder="Enter room ID"
                    class="w-full px-4 py-2 rounded border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    v-model="roomId" />

                <button
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full"
                    @click="joinRoom()">
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