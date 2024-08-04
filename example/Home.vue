<script setup lang="ts">
import {routes} from "./router";
import {computed} from "vue";

const modules = computed(() => {
  return routes.find(item => item.name === "Modules")?.children
})
</script>

<template>
  <div class="home-container">
    <div class="banner">
      <div class="banner-title">Baitu 一个小而全的全端工具包</div>
      <div class="banner-desc">测试示例</div>
    </div>
    <div class="module-list">
      <div class="module-item" v-for="(module, index) in modules" :key="index">
        <div class="child-box" v-if="module.children && module.children.length > 0">
          <div class="module-title">{{ `${index + 1}. ${module.name?.toString()}` }}</div>
          <div class="child-list screen-container">
            <div class="item screen-item" v-for="child in module.children" :key="child.name">
              <a :href="`#/modules/${module.path}/${child.path}`">
                {{ child.name }}
              </a>
            </div>
          </div>
        </div>
        <!--        <div class="item" v-else>{{ module.name }}</div>-->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-container {
}

.banner {
  width: 100%;
  text-align: center;
  background-color: #0ba7e8;
  font-size: 32px;
  color: white;
  padding: 46px 0;

  &-title {
    font-weight: bolder;
  }

  &-desc {
    font-size: 26px;
    letter-spacing: .5rem;
    margin-top: 10px;
  }
}

.module-list {
  max-width: 1900px;
  min-width: 300px;
  width: 90%;
  margin: 10px auto 0;

  .module-item {

  }

  .module-title {
    position: relative;
    //background-color: #0ba7e8;
    //border-left: 4px solid;
    //border-color: #0ba7e8;
    padding: 6px;
    font-weight: bolder;
    font-size: 24px;
    color: #000;

    &:before {
      position: absolute;
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #0ba7e8;
      opacity: 0.6;
      z-index: -1;
    }
  }

  .child-list {
    margin-top: 10px;

    .item {
      display: flex;
      border: 1px solid rgba(158, 158, 158, 0.2);
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      font-size: 14px;
      box-shadow: 0 0 20px -5px rgba(158, 158, 158, 0.4);

      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 12px 16px;
        color: #414146;
        text-decoration: none;
      }
    }
  }
}
</style>
