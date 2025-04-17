<script setup>
import jisuAPI from '@/api/jisuapi'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'Jisu' })

const appkey = import.meta.env.VITE_JISUAPI_APPKEY

// 通用API请求方法
async function callAPI(apiPath, params = {}) {
  try {
    const res = await jisuAPI[apiPath]({ appkey, ...params })
    console.log(res)
    return res
  } catch (err) {
    console.error(err)
    ElMessage.error(err.msg || '请求失败')
    throw err
  }
}

// 区域相关
function province() {
  callAPI('area.province')
}
function city() {
  callAPI('area.city', { parentid: '2' })
}
function town() {
  callAPI('area.town', { parentid: 3400 })
}

// 艺句相关
function query() {
  callAPI('yiju.query', {
    num: 20,
    page: 1,
    classid: '',
    authorid: '',
  })
}
function yijuClass() {
  callAPI('yiju.class')
}
function author() {
  callAPI('yiju.author')
}

// 汇率相关
function convert() {
  callAPI('exchange.convert', {
    from: 'CNY',
    to: 'USD',
    amount: 100,
  })
}
function single() {
  callAPI('exchange.single', { currency: 'CNY' })
}
function currency() {
  callAPI('exchange.currency')
}
function bank() {
  callAPI('exchange.bank', { bank: 'ICBC' })
}

// 黄金相关
function shgold() {
  callAPI('glod.shgold')
}
function shfutures() {
  callAPI('glod.shfutures')
}
function hkgold() {
  callAPI('glod.hkgold')
}
function glodBank() {
  callAPI('glod.bank')
}
function london() {
  callAPI('glod.london')
}
function storegold() {
  callAPI('glod.storegold')
}
</script>

<template>
  <div class="g-container">
    <el-button @click="province">province</el-button>
    <el-button type="primary" @click="city">city</el-button>
    <el-button type="primary" @click="town">town</el-button>
    <el-button type="success" @click="query">query</el-button>
    <el-button type="success" @click="yijuClass">class</el-button>
    <el-button type="success" @click="author">author</el-button>
    <el-button type="info" @click="convert">convert</el-button>
    <el-button type="warning" @click="single">single</el-button>
    <el-button type="danger" @click="currency">currency</el-button>
    <el-button type="primary" @click="bank">bank</el-button>
    <el-button type="success" @click="shgold">shgold</el-button>
    <el-button type="success" @click="shfutures">shfutures</el-button>
    <el-button type="success" @click="hkgold">hkgold</el-button>
    <el-button type="success" @click="glodBank">bank</el-button>
    <el-button type="success" @click="london">london</el-button>
    <el-button type="success" @click="storegold">storegold</el-button>
  </div>
</template>

<style lang="less" scoped></style>
