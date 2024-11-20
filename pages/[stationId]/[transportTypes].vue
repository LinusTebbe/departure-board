<template>
  <div class="flex flex-col gap-2" v-if="data !== null">
    <div class="flex flex-row justify-between text-xl">
      <div class="">{{ data.stationName }}</div>
      <div class="">{{ $dayjs.unix(data.currentTime).local().format('DD.MM.YYYY HH:mm') }}</div>
    </div>
    <div
      v-for="departure of data.departureData"
      class="bg-gray-600 px-2 py-1 rounded-md flex flex-row gap-2"
      >
      <img :src="getTransportTypeFromResponseType(departure.type).image" class="min-h-full h-full" alt=""/>
      <div>
        <div class="font-mono">
          <span v-if="departure.countdown <=30">
            <span v-if="departure.countdown > 0"> In {{ departure.countdown }} min<span v-if="departure.countdown > 1">s</span></span>
            <span v-else>Now</span>
          </span>
          <span v-else>{{ $dayjs.unix(departure.fullTime).local().format('HH:mm') }}</span>
          (<span v-if="departure.delay > 0" class="text-amber-500">+ {{ departure.delay }} min</span><span v-else class="text-green-500">on time</span>)
        </div>
        <div class="flex flex-row gap-2">
          <div>
            <div>{{ departure.name }}</div>
          </div>
        </div>
      </div>
      <div class="ml-auto text-right flex flex-col">
        <div><span  v-if="departure.route !== departure.direction">{{ departure.route }}</span></div>
        <div class="mt-auto">➤ {{ departure.direction }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import appConfig from "~/app.config";
import type DepartureResponse from "~/interfaces/DepartureResponse";
import type TransportType from "~/interfaces/TransportType";

const stationId = useRoute().params.stationId
const transportTypes = useRoute().params.transportTypes
const rowCount = (useRoute().query.rows ?? appConfig.defaultRowCount).toString()

const formData = new FormData()
formData.append('table[departure][stationId]', stationId.toString())
formData.append('table[departure][transport]', transportTypes.toString())
formData.append('table[departure][useAllLines]', '1')
formData.append('table[departure][optimizedForStation]', '0')
formData.append('table[departure][rowCount]', rowCount)
formData.append('table[sortBy]', '1')

const {data, refresh} = await useFetch<DepartureResponse>('/api/table', {
  server: false,
  method: 'POST',
  body: formData,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    'Origin': 'https://abfahrtsmonitor.vrr.de',
    'Referer': 'https://abfahrtsmonitor.vrr.de/'
  }
})

const stationName = computed(() => data.value?.stationName ?? '')

useHead({
  title: stationName,
  titleTemplate: (title) => (title === '' ? 'Departures' : `${title} - Departures`),
})

let interval: ReturnType<typeof setInterval>

onNuxtReady(() => {
  interval = setInterval(refresh, appConfig.secondsToRefresh * 1000)
})

onBeforeUnmount(() => {
  window.clearInterval(interval)
})


const getTransportTypeFromResponseType = (transportType: number): TransportType => {
  return appConfig.transportTypes.filter(type => type.type === transportType || type.alternativeTypes.includes(transportType))[0]
}
</script>

<style>
body {
  overflow: hidden;
}
</style>