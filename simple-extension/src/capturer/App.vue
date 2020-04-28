<template>
  <div class="row mt-4">
    <div class="col-6">
      <div class="container">
        <div class="row">
          <div class="col">
            <button v-if="!isConnected" type="button" class="btn btn-primary" @click.capture="connectToScreen">
              Connect to screen
            </button>
            <template v-else>
              <button type="button" class="btn btn-light" @click="disconnectFromScreen">Disconnect</button>
              <button type="button" class="btn btn-success">
                Capture screen
              </button>
            </template>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <VideoPreview v-bind:is-connected="isConnected"></VideoPreview>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPreview from './components/VideoPreview.vue';

export default {
  name: 'capturerVue',
  components: {
    VideoPreview,
  },
  data: function() {
    return {
      isConnected: false,
    };
  },
  methods: {
    connectToScreen: function() {
      this.isConnected = true;
    },
    disconnectFromScreen: function() {
      this.isConnected = false;
    },
  },
};
</script>

<style scoped></style>
