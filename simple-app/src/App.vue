<template>
    <div id="app" class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
            <a class="navbar-brand active" href="#">Simple app</a>
            <!--      <a class="nav-link" href="#">Link</a>      -->
        </nav>
        <div class="row mt-4"></div>
        <div class="row">
            <div class="col-6">
                <FileUploader id="FileUploader"
                        v-on:file-uploader-event="getEvent">
                </FileUploader>
            </div>
            <div class="col-6">
                <SimpleLogger
                        v-bind:event-data="currentEvent">
                </SimpleLogger>
            </div>
        </div>
    </div>
</template>

<script>
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    import SimpleLogger from './components/simple-logger.vue'
    import FileUploader from './components/file-uploader.vue'

    export default {
        name: 'App',
        components: {
            SimpleLogger,
            FileUploader
        },
        data: function () {
            return {
                currentEvent: {},
            }
        },
        methods: {
            getEvent: function ( eventData ) {
                this.currentEvent = eventData;
            }
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
