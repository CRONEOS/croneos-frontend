
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      { path: 'rewards', component: () => import('pages/rewards.vue') }
    ]
  },
  {
    path: '/mine',
    component: () => import('layouts/MinerLayout.vue'),
    children: [
      { path: '', component: () => import('pages/mine.vue') },
      { path: 'statistics/:accountname', component: () => import('pages/rewards.vue') },
      { path: 'mining-bot', component: () => import('pages/mining-bot.vue') },
    ]
  },
  {
    path: '/schedule',
    component: () => import('layouts/ScheduleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/schedule.vue') },
      { path: 'developers', component: () => import('pages/developers.vue') },
      { path: 'deposits', component: () => import('pages/deposits.vue') }

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
