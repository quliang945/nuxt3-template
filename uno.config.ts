/*
 * @Description: 
 * @Author: quliang945
 * @Date: 2025-02-17 09:08:20
 * @LastEditTime: 2025-06-12 10:19:12
 * @LastEditors: quliang945
 * @FilePath: /nuxt3-template/uno.config.ts
 */
import { defineConfig } from 'unocss'
import { presetUno, presetAttributify, presetIcons } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno({
      preflight: false // 禁用预设样式
    }),
    presetAttributify(), // 允许使用属性模式来应用样式。
    presetIcons(),
    presetRemToPx({
      baseFontSize: 4
    })
  ],
  shortcuts: {
    // 自定义快捷方式
  },
  theme: {
    // 主题配置
    colors: {
      // 自定义颜色
    }
  }
})
