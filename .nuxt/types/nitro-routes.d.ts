// Generated by nitro
import type { Serialize, Simplify } from "nitropack/types";
declare module "nitropack/types" {
  type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T
  interface InternalApi {
    '/__nuxt_error': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/nuxt@3.15.1_@parcel+watcher@2.5.0_@types+node@20.17.12_db0@0.2.1_eslint@9.17.0_jiti@2.4.2__io_ithzvka7k2zmo22gnewdljbdqe/node_modules/nuxt/dist/core/runtime/nitro/renderer').default>>>>
    }
    '/api/_nuxt_icon/:collection': {
      'default': Simplify<Serialize<Awaited<ReturnType<typeof import('../../node_modules/.pnpm/@nuxt+icon@1.13.0_magicast@0.3.5_vite@6.0.7_@types+node@20.17.12_jiti@2.4.2_sass@1.83.1_terse_imxsmedo2uqw6g7u2jl5ozil7a/node_modules/@nuxt/icon/dist/runtime/server/api').default>>>>
    }
  }
}
export {}