<template>
  <!-- Draggable DIV -->
  <div v-show="isConnected" id="mydiv" class="embed-responsive embed-responsive-16by9" ref="mydiv">
    <video class="embed-responsive-item" ref="videoElm" autoplay></video>
    <canvas class="canvasElm" ref="canvasElm"></canvas>

    <button id="takeScreenshot" type="button" class="btn btn-success" @click="takeScreenshot">
      Take screenshot
    </button>
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

class FakeDataTransfer {
  constructor(file) {
    this.dropEffect = 'none';
    this.effectAllowed = 'copyLink';
    this.items = [
      {
        kind: 'file',
        type: 'image/jpeg',
        length: 1,
      },
    ];
    this.types = ['Files'];
    this.getData = function() {
      return file;
    };
    this.files = [file];
  }
}

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
    takeScreenshot: function() {
      const context = this.$refs.canvasElm.getContext('2d');
      const width = this.$refs.videoElm.offsetWidth;
      const height = this.$refs.videoElm.offsetHeight;
      const { videoWidth, videoHeight } = this.$refs.videoElm;
      this.setSizes(videoWidth, videoHeight);
      context.drawImage(this.$refs.videoElm, 0, 0, videoWidth, videoHeight);
      this.$refs.canvasElm.toBlob(blob => this.uploadScreenshot(blob));
      this.setSizes(width, height);
    },
    setSizes: function(width, height) {
      this.$refs.videoElm.setAttribute('width', width);
      this.$refs.videoElm.setAttribute('height', height);
      this.$refs.canvasElm.setAttribute('width', width);
      this.$refs.canvasElm.setAttribute('height', height);
    },
    uploadScreenshot: function(blob) {
      const fileOfBlob = new File([blob], this.getFileName(), { type: 'image/png' });
      const fakeDropEvent = new DragEvent('drop', {
        bubbles: true,
      });

      Object.defineProperty(fakeDropEvent, 'dataTransfer', {
        value: new FakeDataTransfer(fileOfBlob),
      });

      const zone = document.querySelector('#dropzone');
      zone.dispatchEvent(fakeDropEvent);
    },
    getFileName: function() {
      return 'Screenshot_' + Date.now() + '.png';
    },
  },
  watch: {
    isConnected: function(newState) {
      newState ? this.startCapture() : this.stopCapture();
    },
  },
};
</script>
