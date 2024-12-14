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
        指定时间戳：{{new DateTime(1722732305299)}}，比较：{{ new DateTime(1722732305299).equals(new Date(1722732305299)) }}
      </div>
      <div>
        指定年月：
        {{ new DateTime(2024, 1) }}，比较：{{ new DateTime(2024, 1).equals(new Date(2024, 1)) }}
      </div>
      <div>
        指定年月：
        {{ new DateTime(2024, 1) }}，比较：{{ new DateTime(2024, 1).equals(new Date(2024, 1)) }}
      </div>
      <div>
        指定年月日：
        {{ new DateTime(2024, 1, 20) }}，比较：{{ new DateTime(2024, 1, 20).equals(new Date(2024, 1, 20)) }}
      </div>
      <div>
        指定年月日时：
        {{ new DateTime(2024, 1, 20, 12) }}，比较：{{ new DateTime(2024, 1, 20, 12).equals(new Date(2024, 1, 20, 12)) }}
      </div>
      <div>
        指定年月日时分：
        {{ new DateTime(2024, 1, 20, 12, 10) }}，比较：{{ new DateTime(2024, 1, 20, 12, 10).equals(new Date(2024, 1, 20, 12, 10)) }}
      </div>
      <div>
        指定年月日时分秒：
        {{ new DateTime(2024, 1, 20, 12, 10, 45) }}，比较：{{ new DateTime(2024, 1, 20, 12, 10, 45).equals(new Date(2024, 1, 20, 12, 10, 45)) }}
      </div>
      <div>
        指定年月日时分秒毫秒：
        {{ new DateTime(2024, 1, 20, 12, 10, 45, 300) }}，比较：{{ new DateTime(2024, 1, 20, 12, 10, 45, 300).equals(new Date(2024, 1, 20, 12, 10, 45, 300)) }}
      </div>
    </div>
    <div>
      获取月份：
      {{ new DateTime().month() }}
    </div>
    <div>
      设置年份：
      {{ new DateTime().setFullYear(2023) }}，比较：{{ new DateTime().setFullYear(2023).equals(new Date().setFullYear(2023)) }}
    </div>
    <div>
      设置年月：
      {{ new DateTime().setFullYear(2023, 3) }}，比较：{{ new DateTime().setFullYear(2023, 3).equals(new Date().setFullYear(2023, 3)) }}
    </div>
    <div>
      设置年月日：
      {{ new DateTime().setFullYear(2023, 3, 15) }}，比较：{{ new DateTime().setFullYear(2023, 3, 15).equals(new Date().setFullYear(2023, 3, 15)) }}
    </div>
    <div>
      设置月：
      {{ new DateTime().setMonth(3) }}，比较：{{ new DateTime().setMonth(3).equals(new Date().setMonth(3)) }}
    </div>
    <div>
      设置月日：
      {{ new DateTime().setMonth(3, 15) }}，比较：{{ new DateTime().setMonth(3, 15).equals(new Date().setMonth(3, 15)) }}
    </div>
    <div>
      设置时：
      {{ new DateTime().setHours(3) }}，比较：{{ new DateTime().setHours(3).equals(new Date().setHours(3)) }}
    </div>
    <div>
      设置时分：
      {{ new DateTime().setHours(3, 30) }}，比较：{{ new DateTime().setHours(3, 30).equals(new Date().setHours(3, 30)) }}
    </div>
    <div>
      设置时分秒：
      {{ new DateTime().setHours(3, 30, 33) }}，比较：{{ new DateTime().setHours(3, 30, 33).equals(new Date().setHours(3, 30, 33)) }}
    </div>
    <div>
      设置时分秒毫秒：
      {{ new DateTime().setHours(3, 30, 33, 555) }}，比较：{{ new DateTime().setHours(3, 30, 33, 555).equals(new Date().setHours(3, 30, 33, 555)) }}
    </div>
    <div>
      设置分：
      {{ new DateTime().setMinutes(33) }}，比较：{{ new DateTime().setMinutes(33).equals(new Date().setHours(33)) }}
    </div>
    <div>
      设置分秒：
      {{ new DateTime().setMinutes(3, 30) }}，比较：{{ new DateTime().setMinutes(3, 30).equals(new Date().setMinutes(3, 30)) }}
    </div>
    <div>
      设置分秒毫秒：
      {{ new DateTime().setMinutes(30, 33, 555) }}，比较：{{ new DateTime().setMinutes(30, 33, 555).equals(new Date().setMinutes(30, 33, 555)) }}
    </div>
    <div>
      设置秒：
      {{ new DateTime().setSeconds(33) }}，比较：{{ new DateTime().setSeconds(33).equals(new Date().setSeconds(33)) }}
    </div>
    <div>
      设置秒毫秒：
      {{ new DateTime().setSeconds(33, 555) }}，比较：{{ new DateTime().setSeconds(33, 555).equals(new Date().setSeconds(33, 555)) }}
    </div>
    <div>
      转年-月-日：
      {{ new DateTime().toDateObj() }}
    </div>
    <div>
      转时-分-秒：
      {{ new DateTime().toTimeObj() }}
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
      YYYYMMDD：
      {{new DateTime().format('YYYYMMDD')}}
    </div>
    <div>
      YYMD：
      {{new DateTime().format('YYMD')}}
    </div>
    <div>
      YYYY年MM月DD日第Q季：
      {{new DateTime().format('YYYY年MM月DD日第Q季')}}
    </div>
    <div>
      YYYY-MM-DD[T]HH:mm:ss.SSSZ：
      {{new DateTime().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')}}
    </div>
    <div>
      YYYY-MM-DD HH:mm:ss,SSS：
      {{new DateTime().format('yyyy-MM-dd HH:mm:ss,SSS')}}
    </div>
    <div>
      ddd, DD MMM YYYY HH:mm:ss z：
      {{new DateTime().format('ddd, DD MMM YYYY HH:mm:ss z')}}
    </div>
  </div>
</template>

<style scoped>

</style>
