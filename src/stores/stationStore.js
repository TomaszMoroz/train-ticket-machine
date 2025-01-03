import { defineStore } from 'pinia';
import axios from 'axios';

export const useStationStore = defineStore('station', {
  state: () => ({
    stations: [],
    searchQuery: '',
    matchingStations: [],
    nextCharacters: [],
    recentSearches: [],
    error: null,
  }),
  actions: {
    async fetchStations() {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/abax-as/coding-challenge/master/station_codes.json'
        );
        this.stations = response.data.map(s => s.stationName);
      } catch (error) {
        this.error = 'Failed to load stations';
      }
    },
    searchStations(query) {
      if (!this.stations.length) {
        this.fetchStations().then(() => {
          this.executeSearch(query);
        });
      } else {
        this.executeSearch(query);
      }
    },
    executeSearch(query) {
      this.searchQuery = query;
      this.matchingStations = this.stations.filter((station) =>
        station.toLowerCase().startsWith(query.toLowerCase())
      );
      this.nextCharacters = [...new Set(this.matchingStations.map((station) => station[query.length] || ''))];
    },
    addRecentSearch(search) {
      if (!this.recentSearches.includes(search)) {
        this.recentSearches.unshift(search);
        if (this.recentSearches.length > 5) this.recentSearches.pop();
      }
    },
  },
});