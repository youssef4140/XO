<script setup lang="ts">
import { RouterView } from 'vue-router';
import socket from '@/socket';
import { onMounted } from 'vue';
import { listenForRoomEvents } from './services/RoomEvents';

onMounted(() => {
  socket.connect();

  listenForRoomEvents(socket);
});
</script>

<template>  

  <RouterView />
</template>

<style scoped>

</style>
