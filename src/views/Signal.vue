<template>
  <div class="text-black dark:text-white flex flex-col items-center pt-5">
    SignalR Template {{ connectionId }} {{ hubStatus }}
    <div>{{ errorMsg }}</div>
  </div>

</template>

<script setup lang="ts">
// SignalR
import * as signalR from '@microsoft/signalr'
import { ref, onUnmounted } from 'vue'
const connectionId = ref('Not connected')
const hubStatus = ref<signalR.HubConnectionState>(signalR.HubConnectionState.Disconnected)
const errorMsg = ref('')

onUnmounted(async () => {
  if (connection) {
    try {
      //Fire the backend to terminate the websocket
      await connection.stop()
      console.log("Closed connection")
    } catch (error) {
      console.log("Error", error)
    }
  }
})

const connection = new signalR.HubConnectionBuilder()
  .withUrl("somehub", {
    skipNegotiation: false,
    transport: signalR.HttpTransportType.WebSockets,
    headers: {
      securecode: "client-frontend"
    }
  })
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Error)
  .build()

connection.serverTimeoutInMilliseconds = 10 * 60 * 1000
connection.keepAliveIntervalInMilliseconds = 60 * 1000

const initSignalRHub = async () => {
  //console.log('Fire connection connecting...')
  try {
    await connection.start()
    connectionId.value = `${connection.connectionId}`
    hubStatus.value = connection.state
  } catch (e) {
    const ex = e as { errorType: string }
    console.error('Hub error', ex.errorType)
    errorMsg.value = ex.errorType
  }
}

initSignalRHub()

</script>