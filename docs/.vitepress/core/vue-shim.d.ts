declare module '*.vue' {
  const component: import('vue').Component
  export default component
}


declare module 'vitepress/dist/client/theme-default/composables/nav' {
  export function useNav(): {
    isScreenOpen: import('vue').Ref<boolean>
    openScreen: () => void
    closeScreen: () => void
    toggleScreen: () => void
  }
}

declare module 'vitepress/dist/client/theme-default/components/VPNavBar.vue' {
  const component: import('vue').Component
  export default component
}

declare module 'vitepress/dist/client/theme-default/components/VPNavScreen.vue' {
  const component: import('vue').Component
  export default component
}

declare const __DISCORD_WEBHOOK_ADD_REMOVE__: string
declare const __DISCORD_WEBHOOK_STAR_UNSTAR__: string
declare const __DISCORD_WEBHOOK_EDIT__: string
declare const __DISCORD_WEBHOOK_THANKS__: string