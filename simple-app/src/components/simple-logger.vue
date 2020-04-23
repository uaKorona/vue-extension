<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <button type="button"
                        class="btn btn-secondary"
                        @click="clearLog">
                    Clear log
                </button>
            </div>
        </div>
        <div class="row mt-4" v-for="(item, index) in logEvents" :key="index">
            <div class="col" v-for="(value, name) in item" :key="name">
                <div class="row">
                    <div class="col-4 text-success">{{name}}:</div>
                    <div class="col-8 text-left">{{value}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SimpleLogger",
        props: {
            eventData: Object,
        },
        data: function () {
            return {
                logEvents: [this.eventData]
            }
        },
        methods: {
            clearLog: function () {
                this.logEvents.splice(0);
            }
        },
        watch: {
            eventData: function ( newData ) {
                this.logEvents.push( newData );
            }
        }
    }
</script>

<style scoped>

</style>
