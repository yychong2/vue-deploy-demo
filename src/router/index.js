import { createRouter, createWebHistory, RouterView } from 'vue-router'
import HomeView from '../pages/Home.vue'
import Tr from "../i18n/translation"

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
        path: "/",
        component: RouterView,
        beforeEnter: Tr.routeMiddleware,
        children: [{
                path: '/',
                name: 'home',
                component: HomeView,

            },
            {
                path: 'about',
                name: 'about',
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
                path: 'profile',
                name: 'profile',
                component: () =>
                    import ('../pages/Profile.vue')
            },
            {
                path: 'withdrawal',
                name: 'withdrawal',
                component: () =>
                    import ('../pages/Withdrawal.vue')
            },
            {
                path: 'promotion',
                name: 'promotion',
                component: () =>
                    import ('../pages/Promotion.vue')
            }, {
                path: 'bank',
                name: 'bank',
                component: () =>
                    import ('../pages/Bank.vue')
            }, {
                path: 'balance',
                name: 'balance',
                component: () =>
                    import ('../pages/Balance.vue')
            }, {
                path: 'password',
                name: 'password',
                component: () =>
                    import ('../pages/ChangePassword.vue')
            }, {
                path: 'trsdetail',
                name: 'trsdetail',
                component: () =>
                    import ('../pages/TransactionDetail.vue')
            }, {
                path: 'history',
                name: 'history',
                component: () =>
                    import ('../pages/History.vue')
            }, {
                path: 'menu',
                name: 'menu',
                component: () =>
                    import ('../pages/Menu.vue')
            }, {
                path: 'voucher',
                name: 'voucher',
                component: () =>
                    import ('../pages/Voucher.vue')
            }, {
                path: 'transfer',
                name: 'transfer',
                component: () =>
                    import ('../pages/Transfer.vue')
            }, {
                path: 'register',
                name: 'register',
                component: () =>
                    import ('../pages/Register.vue')
            }, {
                path: 'deposit',
                name: 'deposit',
                component: () =>
                    import ('../pages/Deposit.vue')
            }, {
                path: 'depositpg',
                name: 'depositpg',
                component: () =>
                    import ('../pages/DepositPG.vue')
            }, {
                path: 'referrer',
                name: 'referrer',
                component: () =>
                    import ('../pages/Referrer.vue')
            }, {
                path: 'launchgame',
                name: 'launchgame',
                component: () =>
                    import ('../pages/LaunchGame.vue')
            }, {
                path: 'testing',
                name: 'testing',
                component: () =>
                    import ('../pages/Testing.vue')
            }
        ]
    }]
})

// router.beforeEach((to, from, next) => {
//     console.log(from)
//     console.log(to)
//     console.log(next())
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         // this route requires auth, check if logged in
//         // if not, redirect to login page.
//         if (!store.getters.isLoggedIn) {
//             next({
//                 name: 'login'
//             })
//         } else {
//             next({
//                 name: 'home'
//             })
//         }
//     } else {
//         next()
//     }
// })

// router.afterEach((to, from) => {
//     Vue.nextTick(() => {
//         document.title = to.pageTitle || 'Test App';
//     });
// });

export default router