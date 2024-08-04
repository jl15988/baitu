<script setup lang="ts">
import {DateTime} from "../../../src";

const dateTime = new DateTime()
</script>

<template>
  <div>
    <div>
      打印DateTime：{{ new DateTime() }}，Date：{{ new Date() }}
    </div>
    <div>
      构建：
      <div>
        指定时间戳：
        {{ new DateTime(1722732305299) }}，Date：{{ new Date(1722732305299) }}
      </div>
      <div>
        指定年月：
        {{ new DateTime(2024, 1) }}，Date：{{ new Date(2024, 1) }}
      </div>
      <div>
        指定年月：
        {{ new DateTime(2024, 1) }}，Date：{{ new Date(2024, 1) }}
      </div>
      <div>
        指定年月日：
        {{ new DateTime(2024, 1, 20) }}，Date：{{ new Date(2024, 1, 20) }}
      </div>
      <div>
        指定年月日时：
        {{ new DateTime(2024, 1, 20, 12) }}，Date：{{ new Date(2024, 1, 20, 12) }}
      </div>
      <div>
        指定年月日时分：
        {{ new DateTime(2024, 1, 20, 12, 10) }}，Date：{{ new Date(2024, 1, 20, 12, 10) }}
      </div>
      <div>
        指定年月日时分秒：
        {{ new DateTime(2024, 1, 20, 12, 10, 45) }}，Date：{{ new Date(2024, 1, 20, 12, 10, 45) }}
      </div>
      <div>
        指定年月日时分秒毫秒：
        {{ new DateTime(2024, 1, 20, 12, 10, 45, 300).getTime() }}，Date：{{ new Date(2024, 1, 20, 12, 10, 45, 300).getTime() }}
      </div>
    </div>
    <div>
      获取月份：
      {{ new DateTime().month() }}
    </div>
    <div>
      设置年份：
      {{ new DateTime().setFullYear(2023) }}，Date：{{ new Date().setFullYear(2023) }}
    </div>
    <div>
      设置年月：
      {{ new DateTime().setFullYear(2023, 3) }}，Date：{{ new Date().setFullYear(2023, 3) }}
    </div>
    <div>
      设置年月日：
      {{ new DateTime().setFullYear(2023, 3, 15) }}，Date：{{ new Date().setFullYear(2023, 3, 15) }}
    </div>
    <div>
      设置月：
      {{ new DateTime().setMonth(3) }}，Date：{{ new Date().setMonth(3) }}
    </div>
    <div>
      设置月日：
      {{ new DateTime().setMonth(3, 15) }}，Date：{{ new Date().setMonth(3, 15) }}
    </div>
    <div>
      设置时：
      {{ new DateTime().setHours(3) }}，Date：{{ new Date().setHours(3) }}
    </div>
    <div>
      设置时分：
      {{ new DateTime().setHours(3, 30) }}，Date：{{ new Date().setHours(3, 30) }}
    </div>
    <div>
      设置时分秒：
      {{ new DateTime().setHours(3, 30, 33) }}，Date：{{ new Date().setHours(3, 30, 33) }}
    </div>
    <div>
      设置时分秒毫秒：
      {{ new DateTime().setHours(3, 30, 33, 555) }}，Date：{{ new Date().setHours(3, 30, 33, 555) }}
    </div>
    <div>
      设置分：
      {{ new DateTime().setMinutes(33) }}，Date：{{ new Date().setHours(33) }}
    </div>
    <div>
      设置分秒：
      {{ new DateTime().setMinutes(3, 30) }}，Date：{{ new Date().setMinutes(3, 30) }}
    </div>
    <div>
      设置分秒毫秒：
      {{ new DateTime().setMinutes(30, 33, 555) }}，Date：{{ new Date().setMinutes(30, 33, 555) }}
    </div>
    <div>
      设置秒：
      {{ new DateTime().setSeconds(33) }}，Date：{{ new Date().setSeconds(33) }}
    </div>
    <div>
      设置秒毫秒：
      {{ new DateTime().setSeconds(33, 555) }}，Date：{{ new Date().setSeconds(33, 555) }}
    </div>
    <div>
      对象数据：
      {{ new DateTime().objectValues() }}
    </div>
    <div>
      转年-月-日：
      {{ new DateTime().toDate() }}
    </div>
    <div>
      转时-分-秒：
      {{ new DateTime().toTime() }}
    </div>
    <div>
      格式化：
    </div>
    <div>
      formatDateTime：
      {{new DateTime().formatDateTime()}}
    </div>
    <div>
      formatDate：
      {{new DateTime().formatDate()}}
    </div>
    <div>
      formatTime：
      {{new DateTime().formatTime()}}
    </div>
    <div>
      yyyyMMdd：
      {{new DateTime().format('yyyyMMdd')}}
    </div>
    <div>
      yyMd：
      {{new DateTime().format('yyyyyyMd')}}
    </div>
    <div>
      yyyy年MM月dd日第q季：
      {{new DateTime().format('yyyy年MM月dd日第q季')}}
    </div>
  </div>
</template>

<style scoped>

</style>
