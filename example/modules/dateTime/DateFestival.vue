<script setup lang="ts">
import DateFestival from "../../../src/modules/dateTime/DateFestival";
</script>

<template>
  <div>
    <div>
      {{ DateFestival.getChineseFestival(2024, 7, 7) }}
    </div>
    <div>
      {{ DateFestival.getChineseFestival(2024, 7, 21) }}
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
