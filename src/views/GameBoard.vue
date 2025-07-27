<script lang="ts" setup>
// import Modal from '@/components/Modal.vue';
import socket from '@/socket';
import { room, sign } from '@/stores/roomStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(() => {
    if (!room.ready) {
        console.log('not ready')
        router.push('/');
    }
})

const tik = (index: number) => {
    if (sign.value !== room.game?.turn) return;

    room.game.tiles[index].symbol = sign.value
    room.game.turn = flip(room.game.turn)

    socket.emit('tik', index);

}

const flip = (symbol:'X'|'O') => {
    return  symbol === 'X'? 'O':'X';
}

const playAgain = () =>{
    socket.emit('playAgain');     
    console.log('play again from game board') 
}


</script>
<script lang="ts">
import Modal from '@/components/Modal.vue';
import { ref, type Ref } from 'vue';

export const winner: Ref<InstanceType<typeof Modal> | null> = ref(null);


</script>
<template>

    <Modal ref="winner" @playAgain="playAgain()" />
   <div v-if="room.game"
    class="container flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white space-y-8">

    <div class="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6 w-full max-w-4xl">
        <h1 class="text-2xl font-bold text-indigo-400">You're {{ sign }}</h1>
        <h1 class="text-2xl font-bold text-indigo-400">It's {{ room.game.turn }} Turn</h1>

        <!-- 3x3 Grid - Fixed sizing -->
        <div class="grid grid-cols-3 gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <div v-for="(tile, index) in room.game.tiles" :key="index"
                class="aspect-square bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition duration-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold min-h-20 sm:min-h-24 md:min-h-28 lg:min-h-32 xl:min-h-36 relative"
                :class="{
                    'hover:border-indigo-400': !tile.symbol
                }" @click="tik(index)">
                
                <!-- Symbol with glow effect -->
                <template v-if="tile.symbol">
                    <!-- Main symbol -->
                    <span :class="{
                        'text-blue-400': tile.symbol === 'X',
                        'text-red-400': tile.symbol === 'O'
                    }">{{ tile.symbol }}</span>
                    
                    <!-- Glow effect -->
                    <span class="absolute inset-0 flex items-center justify-center blur-lg opacity-50"
                          :class="{
                              'text-blue-400': tile.symbol === 'X',
                              'text-red-400': tile.symbol === 'O'
                          }">{{ tile.symbol }}</span>
                </template>
                
                <!-- Empty space -->
                <span v-else>&nbsp;</span>
            </div>
        </div>

        <!-- Game Info -->
        <div class="text-center space-y-2">
            <p class="text-sm text-gray-400">Room: <span class="text-indigo-400">{{ room.id }}</span></p>
            <p class="text-sm text-gray-400">Players: <span class="text-green-400">{{ room.playerCount }}</span></p>
        </div>
    </div>
</div>
</template>



<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    color: white;
    user-select: none;
}
</style>
