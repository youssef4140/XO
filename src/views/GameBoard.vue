<script lang="ts" setup>
import { room } from '@/stores/roomStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
onMounted(()=>{
    if(!room.ready){
        router.push('/');
    }
})
</script>

<template>
    <p style="color:white">
        {{ room }}
    </p>

    GameBoard
</template>