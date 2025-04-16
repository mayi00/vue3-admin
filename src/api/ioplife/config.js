/*
 * @Description :
 * @Author      : MDT
 * @Date        : 2025-04-16
 * @LastEditors : MDT
 * @LastEditTime: 2025-04-16
 * @FilePath    : \vue3-admin\src\api\ioplife\config.js
 * 代码是写出来给人看的，附带能在机器上运行。
 * Copyright (c) 2025 by MDT, All Rights Reserved.
 */

export const getProxy = () => {
  let sys = ''
  let oprdiff = ''
  switch (import.meta.env.VITE_NODE_ENV) {
    case 'development':
      sys = '/proxy-ioplife/ioplife/pxy/iop-sys/sys/api'
      oprdiff = '/proxy-ioplife/ioplife/pxy/iop-oprdiff'
      break
    case 'test':
      sys = '/ioplife/pxy/iop-sys/sys/api'
      oprdiff = '/ioplife/pxy/iop-oprdiff'
      break
    default:
      sys = '/ioplife/pxy/iop-sys/sys/api'
      oprdiff = '/ioplife/pxy/iop-oprdiff'
      break
  }
  return { sys, oprdiff }
}
