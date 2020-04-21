<template>
    <div class="container">
        <div class="row mt-4">
            <div class="col-6">
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
            <video ref="videoElm" autoplay="true"></video>
        </div>
    </div>
</template>

<script>
    const displayMediaOptions = {
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
            connectToScreen: function () {
                this.isConnected = true;

                return navigator.mediaDevices
                    .getDisplayMedia( displayMediaOptions )
                    .then( srcObject => {
                        this.$refs.videoElm.srcObject = srcObject;
                        return this.$refs.videoElm.play();
                        /*this.$refs.videoElm.srcObject.getTracks()[ 0 ].addEventListener( 'ended', ()=> {

                        } );*/
                    } )
                    .catch( err => {
                        console.error( "Error:" + err );
                        return null;
                    } );


            },
            disconnectFromScreen: function () {
                this.isConnected = false;
            }
        }
    }
</script>

<style scoped>

</style>
