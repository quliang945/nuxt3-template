import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', {
  state: ()=> ({
      name: 'Fe',
      age: 1
}),
  actions: {
    setName(params: any) {
      this.name = params;
    },
    getName() {
      return this.name
    },
  },
  persist:import.meta.client && {
    storage: sessionStorage,
    // serializer: {
    //   deserialize: parse,
    //   serialize: stringify
    // }
  }

})
