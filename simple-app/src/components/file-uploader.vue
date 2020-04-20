<template>
    <div class="row">
        <div class="col">
            <vue-dropzone
                    ref="myVueDropzone"
                    id="dropzone"
                    :options="dropzoneOptions"
                    :useCustomSlot=true
                    @vdropzone-file-added="fileAdded">
                <div class="dropzone-custom-content">
                    <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
                    <div class="subtitle">...or click to select a file from your computer</div>
                </div>
            </vue-dropzone>
        </div>
    </div>

</template>

<script>
    import vue2Dropzone from 'vue2-dropzone';

    export default {
        name: "FileUploader",
        components: {
            vueDropzone: vue2Dropzone
        },
        data: function () {
            return {
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 150,
                    addRemoveLinks: true
                }
            }
        },
        methods: {
            fileAdded( file ) {
                this.fileUploaderEvent({
                    'added file': file.name
                })
            },
            fileUploaderEvent(eventData) {
                this.$emit('file-uploader-event', eventData)
            }
        }
    }
</script>

<style scoped>
    .dropzone-custom-title {
        margin-top: 0;
        color: #00b782;
    }

    .subtitle {
        color: #314b5f;
    }
</style>
