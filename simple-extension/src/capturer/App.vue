<template>
    <div class="col-6">
        <div class="container">
            <div class="row">
                <div class="col">
                    <button v-if="!isConnected"
                            type="button"
                            class="btn btn-primary"
                            @click.capture="connectToScreen">
                        Connect to screen
                    </button>
                    <template v-else>
                        <button type="button"
                                class="btn btn-light"
                                @click="disconnectFromScreen">Disconnect
                        </button>
                        <button type="button"
                                class="btn btn-success">
                            Capture screen
                        </button>
                    </template>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col embed-responsive embed-responsive-16by9">
                    <video class="embed-responsive-item"
                           ref="videoElm"
                           autoplay>
                    </video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const mediaOptions = {
        video: {
            cursor: "always",
            width: 1920,
        },
        audio: false
    }

    export default {
        name: "capturerVue",
        data: function () {
            return {
                isConnected: false,
                srcObject: null
            }
        },
        methods: {
            connectToScreen: async function () {
                this.isConnected = true;

                this.$refs.videoElm.srcObject = await navigator.mediaDevices.getDisplayMedia( mediaOptions );
                return this.$refs.videoElm.play();
            },
            disconnectFromScreen: function () {
                this.isConnected = false;

                this.$refs.videoElm.srcObject
                    .getTracks()
                    .forEach( track => track.stop() );

                this.$refs.videoElm.srcObject = null;
            }
        }
    }
</script>

<style scoped>

</style>
