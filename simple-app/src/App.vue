<template>
    <div id="app" class="container">
        <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
            <a class="navbar-brand active" href="#">Simple app</a>
            <!--      <a class="nav-link" href="#">Link</a>      -->
        </nav>
        <div class="row"></div>
        <div class="row">
            <div class="col-6">
                <FileUploader></FileUploader>
            </div>
            <div class="col-6">Log</div>
        </div>
<!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div>
</template>

<script>
    import 'vue2-dropzone/dist/vue2Dropzone.min.css'
    // import HelloWorld from './components/HelloWorld.vue'
    import FileUploader from './components/file-uploader.vue'

    export default {
        name: 'App',
        components: {
            // HelloWorld,
            FileUploader
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
