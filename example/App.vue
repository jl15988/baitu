<script setup lang="ts">

</script>

<template>
  <router-view/>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f9f9f9;
}

.screen-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

@media screen and (min-width: 1900px) {
  .screen-container .screen-item {
    width: calc(16.666% - 10px + 1.666px) !important;
  }
}

@media screen and (min-width: 1500px) and (max-width: 1900px) {
  .screen-container .screen-item {
    width: calc(20% - 10px + 2px) !important;
  }
}

@media screen and (min-width: 1100px) and (max-width: 1500px) {
  .screen-container .screen-item {
    width: calc(25% - 10px + 2.5px) !important;
  }
}

@media screen and (min-width: 700px) and (max-width: 1100px) {
  .screen-container .screen-item {
    width: calc(33.333% - 10px + 3px) !important;
  }
}

@media screen and (max-width: 700px) {
  .screen-container .screen-item {
    width: 100% !important;
  }
}
</style>
