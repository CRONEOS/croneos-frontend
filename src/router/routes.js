
const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      { path: 'gas-tokens', component: () => import('pages/gas-tokens.vue') }

      
    ]
  },
  {
    path: '/mine',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/app/mine.vue') },
      { path: 'rewards', component: () => import('pages/app/rewards.vue') },
      
    ]
  },
  {
    path: '/schedule',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/app/schedule.vue') },
      { path: 'deposits', component: () => import('pages/app/deposits.vue') }

    ]
  },
  {
    path: '/docs',
    component: () => import('layouts/DocsLayout.vue'),
    children: [
      { path: '', component: () => import('pages/docs/getting-started.vue') },
      { path: 'getting-started', component: () => import('pages/docs/getting-started.vue') },
      { path: 'due-date', component: () => import('pages/docs/due-date.vue') },
      { path: 'expiration', component: () => import('pages/docs/expiration.vue') },
      { path: 'gas', component: () => import('pages/docs/gas.vue') },
      { path: 'developers', component: () => import('pages/docs/full-example.vue') },
      { path: 'mining-bot', component: () => import('pages/docs/mining-bot.vue') },

    ]
  },
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
