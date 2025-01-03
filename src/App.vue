<template>
  <div id="app">
    <h1>Train Ticket Machine</h1>
    <StationSearch />
    <StationList />
    <RecentSearches />
  </div>
</template>

<script setup>
import StationSearch from './components/StationSearch.vue';
import StationList from './components/StationList.vue';
import RecentSearches from './components/RecentSearches.vue';
</script>