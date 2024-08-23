<script setup lang="ts">
import {onMounted, ref} from "vue";
import {FileUtil} from "../../../src/index";

const fileInputRef = ref()
const fileType = ref("")

onMounted(() => {
  const input = fileInputRef.value

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        FileUtil.getHexString(file, 100).then(res => console.log(res))
        FileUtil.getTypeMagic(file).then(res => {
          console.log(res)
          fileType.value = res
        })
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  };
})
</script>

<template>
<input type="file" ref="fileInputRef">
  文件类型：{{fileType}}
</template>

<style scoped lang="scss">

</style>
