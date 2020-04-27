<template>
  <!-- Draggable DIV -->
  <div id="mydiv" ref="mydiv">
    <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
    <div id="mydivheader">Click here to move</div>

    <video class="" ref="videoElm" autoplay></video>
  </div>
</template>

<script>
export default {
  name: 'VideoPreview',
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
  },
};
</script>

<style lang="scss" scoped></style>
