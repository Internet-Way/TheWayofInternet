import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useThemeHandler } from './themes/state'
import Layout from './core/Layout.vue'
import BlogPost from './blog/BlogPost.vue'
import ContributorList from './components/ContributorList.vue'
import ContributorCard from './components/ContributorCard.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import Tooltip from './components/Tooltip.vue'
import './core/style.scss'
import 'virtual:uno.css'

const themeConfig: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('BlogPost', BlogPost)
    app.component('Post', BlogPost)
    app.component('ContributorList', ContributorList)
    app.component('ContributorCard', ContributorCard)
    app.component('Tooltip', Tooltip)
    app.use(FloatingVue)
    useThemeHandler()
  }
}

export default themeConfig
