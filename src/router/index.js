import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../pages/Home.vue'
import Tr from "../i18n/translation"

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/:locale?", // <--- 2
        component: RouterView, // <--- 3
        beforeEnter: Tr.routeMiddleware, // <--- add this
        children: [ // <--- 4
            {
                path: '',
                name: 'home',
                component: HomeView,

            },
            {
                path: 'about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ('../pages/About.vue')
            },
            {
                path: 'login',
                name: 'login',
                component: () =>
                    import ('../pages/Login.vue')
            },
            {
                path: 'language',
                name: 'language',
                component: () =>
                    import ('../pages/Language.vue')
            },
            {
                path: '/:pathMatch(.*)',
                name: 'not-found',
                component: () =>
                    import ('../pages/NotFound.vue')
            }
        ]
    }]
})

export default router