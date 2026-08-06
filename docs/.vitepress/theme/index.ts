import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { useThemeHandler } from './themes/state'
import Layout from './core/Layout.vue'
import BlogPost from './blog/BlogPost.vue'
import BlogIndex from './blog/BlogIndex.vue'
import StatsPage from './stats/StatsPage.vue'
import StatsInfo from './stats/StatsInfo.vue'
import ContributorList from './components/ContributorList.vue'
import ContributorCard from './components/ContributorCard.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import Tooltip from './components/Tooltip.vue'
import Feedback from './components/Feedback.vue'
import './core/style.scss'
import 'virtual:uno.css'

const themeConfig: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('BlogPost', BlogPost)
    app.component('Post', BlogPost)
    app.component('BlogIndex', BlogIndex)
    app.component('StatsPage', StatsPage)
    app.component('StatsInfo', StatsInfo)
    app.component('ContributorList', ContributorList)
    app.component('ContributorCard', ContributorCard)
    app.component('Tooltip', Tooltip)
    app.component('Feedback', Feedback)
    app.use(FloatingVue)
    useThemeHandler()
  }
}

export default themeConfig
