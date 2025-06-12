import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../node_modules/.pnpm/nuxt@3.15.1_@parcel+watcher@2.5.0_@types+node@20.17.12_db0@0.2.1_eslint@9.17.0_jiti@2.4.2__io_ithzvka7k2zmo22gnewdljbdqe/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}