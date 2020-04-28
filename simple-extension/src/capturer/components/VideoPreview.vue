<template>
  <!-- Draggable DIV -->
  <div id="mydiv" ref="mydiv">
    <div id="mydivheader" class="bg-success text-white">Preview</div>

    <video class="" ref="videoElm" autoplay></video>
  </div>
</template>

<script>
const mediaOptions = {
  video: {
    cursor: 'always',
    width: 1920,
  },
  audio: false,
};

export default {
  name: 'VideoPreview',
  props: {
    isConnected: Boolean,
  },
  data: function() {
    return {
      pos1: 0,
      pos2: 0,
      pos3: 0,
      pos4: 0,
    };
  },
  mounted() {
    this.$refs.mydiv.onmousedown = e => this.dragMouseDown(e);
  },
  methods: {
    dragMouseDown: function(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = e => this.elementDrag(e);
    },
    elementDrag: function(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      const newTop = this.$refs.mydiv.offsetTop - this.pos2 + 'px';
      const newLeft = this.$refs.mydiv.offsetLeft - this.pos1 + 'px';
      this.$refs.mydiv.style.top = newTop;
      this.$refs.mydiv.style.left = newLeft;
    },
    closeDragElement: function() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    },
    startCapture: async function() {
      this.$refs.videoElm.srcObject = await navigator.mediaDevices.getDisplayMedia(mediaOptions);

      return this.$refs.videoElm.play();
    },
    stopCapture: function() {
      this.$refs.videoElm.srcObject.getTracks().forEach(track => track.stop());

      this.$refs.videoElm.srcObject = null;
    },
  },
  watch: {
    isConnected: function(newState) {
      newState ? this.startCapture() : this.stopCapture();
    },
  },
};
</script>

<style lang="scss" scoped></style>
