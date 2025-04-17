<script setup>
import jisuAPI from '@/api/jisuapi'
import { ElMessage } from 'element-plus'

defineOptions({ name: 'Jisu' })

function province() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
  }
  jisuAPI.area
    .province(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
      ElMessage.error(err.msg)
    })
}

function city() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
    parentid: '2',
  }
  jisuAPI.area
    .city(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}
function town() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
    parentid: 3400,
  }
  jisuAPI.area
    .town(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}

function query() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
    num: 20,
    page: 1,
    classid: '',
    authorid: '',
  }
  jisuAPI.yiju
    .query(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}
function yijuClass() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
  }
  jisuAPI.yiju
    .class(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}
function author() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
  }
  jisuAPI.yiju
    .author(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}

function convert() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
    from: 'CNY',
    to: 'USD',
    amount: 100,
  }
  jisuAPI.exchange
    .convert(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}
function single() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
    currency: 'CNY',
  }
  jisuAPI.exchange
    .single(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}
function currency() {
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
  }
  jisuAPI.exchange
    .currency(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
}
function bank() {
  // 银行编码，工商银行：ICBC ，中国银行：BOC ，农业银行：ABCHINA ，交通银行：BANKCOMM ，建设银行：CCB ，招商银行：CMBCHINA ，光大银行：CEBBANK ，浦发银行：SPDB ，兴业银行：CIB ，中信银行：ECITIC，默认BOC
  const params = {
    appkey: import.meta.env.VITE_JISUAPI_APPKEY,
    bank: 'ICBC',
  }
  jisuAPI.exchange
    .bank(params)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      ElMessage.error(err.msg)
      console.error(err)
    })
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
  </div>
</template>

<style lang="less" scoped></style>
