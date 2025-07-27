<template>
  <div>
    <!-- <button ref="open" @click="openModal">Open</button> -->
    <div class="modal-container">
      <dialog ref="modal">
        <div ref="container">
          <!-- Winner Display -->
          <div v-if="winner" class="flex flex-col items-center justify-center min-h-[400px] bg-gray-900 text-white p-8">
            <div
              class="bg-gray-800 rounded-lg shadow-lg p-12 flex flex-col items-center space-y-8 border-2 border-indigo-400">
              <!-- Winner Icon with Animation -->
              <div class="relative">
                <div class="text-8xl sm:text-9xl md:text-[10rem] font-bold animate-bounce"
                  :class="winner === 'X' ? 'text-blue-400' : 'text-red-400'">
                  {{ winner }}
                </div>
                <!-- Glow effect -->
                <div class="absolute inset-0 text-8xl sm:text-9xl md:text-[10rem] font-bold blur-lg opacity-50"
                  :class="winner === 'X' ? 'text-blue-400' : 'text-red-400'">
                  {{ winner }}
                </div>
              </div>

              <!-- Winner Text -->
              <div class="text-center space-y-4">
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-400 animate-pulse">
                  Winner!
                </h1>
                <p class="text-xl sm:text-2xl text-gray-300">
                  Player <span :class="winner === 'X' ? 'text-blue-400' : 'text-red-400'" class="font-bold">{{ winner
                    }}</span> wins the game!
                </p>
              </div>

              <!-- Celebration Effects -->
              <div class="flex space-x-4 text-yellow-400 text-2xl animate-pulse">
                <span>🎉</span>
                <span>🏆</span>
                <span>🎊</span>
              </div>

              <!-- Play Again Button -->
              <button @click="playAgain"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
                Play Again
              </button>
            </div>
          </div>
          <!-- <slot></slot> -->
        </div>
      </dialog>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from 'vue';

const modal: Ref<HTMLDialogElement | null> = ref(null);
const winner: Ref<'X' | 'O' | null> = ref(null);

// const open: Ref<HTMLButtonElement | null> = ref(null);
let modalState = ref(false);
const container: Ref<HTMLElement | null> = ref(null);

const openModal = () => {
  if (modal.value) modal.value.showModal();
  setTimeout(() => {
    modalState.value = true;
  }, 100);
}
const emit = defineEmits(['playAgain'])
const playAgain = () => {
  emit('playAgain')
  console.log('play again from modal')
}
const closeModal = () => {
  if (modal.value) modal.value.close();
  modalState.value = false;
  // winner.value = null; 
}

const setWinner = (w: 'X' | 'O' | null) => {
  winner.value = w;
  console.log(winner.value);
  if (w) { 
    openModal();
   } else {
    closeModal();
   }

}

const inject = (html: string) => {
  // if (!container.value) return;
  // container.value.innerHTML = html;
  // openModal();
}

// document.addEventListener("click", (e) => {
//     if (modalState.value == true && !container.value?.contains(e.target as Node)) {
//         modalState.value = false;
//         closeModal();
//     }
// });

defineExpose({
  openModal,
  closeModal,
  inject,
  setWinner
});
</script>

<style scoped lang="scss">
dialog {
  background-color: rgba(44, 50, 51, 0.40);
  // position: fixed;
  border: none;
  // top: 10%;
  // left: 15%;
  user-select: none;
  margin: auto;

  @media screen and (max-width: 800px) {
    // top: 5%;
    // left: 5%;
  }

  // z-index: 4;
  &::backdrop {
    background-color: rgba(44, 50, 51, 0.80);
    user-select: none;
  }

  .container {
    overflow: hidden;
    user-select: none;
  }
}

// Animation styles
@keyframes bounce {

  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>