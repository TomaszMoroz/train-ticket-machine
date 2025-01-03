<template>
  <div>
    <h2>Recent Searches</h2>
    <ul>
      <li v-for="search in store.recentSearches" :key="search">
        {{ search }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStationStore } from '../stores/stationStore';
const store = useStationStore();
</script>