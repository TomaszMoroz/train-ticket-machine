<template>
  <div class="station-list">
    <h2>Matching Stations</h2>
    <ul class="stations">
      <li
        v-for="station in store.matchingStations"
        :key="station"
        @click="selectStation(station)"
        class="station-item"
      >
        {{ station }}
      </li>
    </ul>

    <!-- <h2>Next Characters</h2>
    <ul class="next-chars">
      <li v-for="char in store.nextCharacters" :key="char" class="char-item">
        {{ char }}
      </li>
    </ul> -->
  </div>
</template>

<script setup>
import { useStationStore } from '../stores/stationStore';
const store = useStationStore();

function selectStation(station) {
  alert(`You selected: ${station}`);
  store.addRecentSearch(station);
}
</script>

<style scoped>
.station-list {
  text-align: center;
  margin-top: 1rem;
}

.stations {
  list-style: none;
  padding: 0;
}

.station-item {
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-bottom: 1px solid #ccc;
}

.station-item:hover {
  background-color: #f1f3f4;
}

.next-chars {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.char-item {
  padding: 0.3rem 0.5rem;
  font-size: 1.2rem;
  background-color: #f1f3f4;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>