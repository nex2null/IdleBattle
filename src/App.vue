<template>
    <div id="app">
        <p>
            <router-link to="/">Go to Town</router-link>&nbsp;
            <router-link to="/battle">Go to Battle</router-link>&nbsp;
            <router-link to="/inventory">Go to Inventory</router-link>
        </p>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
    constructor() {
        super();
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
