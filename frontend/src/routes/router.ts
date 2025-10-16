import {createRouter, createWebHistory} from 'vue-router'

import ProfilesView from '@/views/ProfilesView.vue'

const routes = [
    {
        path: '/',
        name: 'profilesview',
        component: ProfilesView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router