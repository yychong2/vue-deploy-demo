import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/Home.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../pages/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('../pages/Login.vue')
        },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found',
            component: () =>
                import ('../pages/NotFound.vue')
        }
    ]
})

export default router