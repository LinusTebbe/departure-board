<template>
  <div class="flex flex-row gap-2">
    <h1 class="text-2xl">1. Search for your station</h1>
    <input
        type="text"
        placeholder="Name"
        @change="(event: Event) => updateStations((event.target as HTMLInputElement).value)"
        class="bg-gray-600 px-2 max-w-80 flex-grow"
    />
  </div>
  <div class="flex flex-col gap-1 my-2 pr-2 -mr-2 max-h-64 overflow-y-auto">
    <div
        v-for="station of stations"
        class="px-4 py-2 rounded-md bg-gray-600 cursor-pointer"
        :class="currentSelectedStationId === station.data ? 'bg-gray-800' : ''"
        @click="currentSelectedStationId = station.data"
    >
      {{ station.value }}
    </div>
  </div>
  <div v-if="currentSelectedStationId !== null">
    <h1 class="text-2xl">2. Add transport types for which to search</h1>
    <div
        class="flex flex-row gap-2"
    >
      <div
          class="border-2 rounded-md cursor-pointer pt-1 px-1 bg-gray-600"
          v-for="transportType of appConfig.transportTypes"
          :class="activeTransportTypes.includes(transportType.type) ? 'border-white' : 'border-gray-500'"
          @click="() => toggleTransportType(transportType.type)"
        >
        <img :src="transportType.image">
      </div>
    </div>

    <NuxtLink
        :to="{ name: 'stationId-transportTypes', params: { stationId: currentSelectedStationId, transportTypes: activeTransportTypes.join(',') } }"
        >
      <div class="bg-gray-600 px-2 py-1 rounded-md mt-2 text-center text-3xl">GO!</div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type StationEntry from "~/interfaces/StationEntry";
import type StationSearchResult from "~/interfaces/StationSearchResult";
import appConfig from "~/app.config";

const currentSelectedStationId = ref<number|null>(null)

const stations = ref<StationEntry[]>([])
const updateStations = async (searchQuery: string) => {
  stations.value = (await $fetch<StationSearchResult>(`/api/search?query=${searchQuery}`)).suggestions
}

const activeTransportTypes = ref<number[]>(appConfig.transportTypes.map(transportType => transportType.type))
const toggleTransportType = (transportType: number) => {
  if (activeTransportTypes.value.includes(transportType)) {
    activeTransportTypes.value = activeTransportTypes.value.filter(type => type !== transportType)
  } else {
    activeTransportTypes.value.push(transportType)
  }
}
</script>

<style scoped>

</style>