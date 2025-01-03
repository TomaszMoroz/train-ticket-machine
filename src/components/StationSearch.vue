<template>
  <div class="station-search">
    <input
      type="text"
      v-model="query"
      placeholder="Enter station name"
      @input="onInput"
      class="search-input"
    />
    <button @click="clearSearch" class="clear-button">Clear</button>

    <div class="keyboard">
      <button
        v-for="char in alphabet"
        :key="char"
        @click="onCharClick(char)"
        :class="['keyboard-key', isCharEnabled(char) ? 'enabled' : 'disabled']"
        :disabled="!isCharEnabled(char)"
      >
        {{ char }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStationStore } from '../stores/stationStore';

const store = useStationStore();
const query = ref('');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Computed property to get the next possible characters
const nextChars = computed(() => {
  return store.nextCharacters;
});

onMounted(() => {
  store.fetchStations();
});

function onInput() {
  store.searchStations(query.value);
}

function clearSearch() {
  query.value = '';
  store.searchStations('');
}

function onCharClick(char) {
  query.value += char;
  store.searchStations(query.value);
}

// Function to determine if a character is enabled
function isCharEnabled(char) {
  if (query.value === '') {
    return true; // Enable all characters if input is empty
  }
  
  // Ensure only characters that are valid after the current query are enabled
  // The 'nextChars' includes multiple occurrences of valid next characters
  return nextChars.value.includes(char.toLowerCase());
}
</script>

<style scoped>
.station-search {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.clear-button {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 1rem;
}

.clear-button:hover {
  background-color: #357ae8;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.keyboard-key {
  padding: 0.5rem;
  font-size: 1rem;
  text-align: center;
  background-color: #f1f3f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
}

.keyboard-key.enabled {
  background-color: #4285f4;
  color: white;
}

.keyboard-key.disabled {
  background-color: #e8eaed;
  color: #bbb;
}

.keyboard-key:hover {
  background-color: #e8eaed;
}
</style>
