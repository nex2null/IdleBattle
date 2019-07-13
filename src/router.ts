import Vue from 'vue';
import Router from 'vue-router';
import TownComponent from '@/VueComponents/TownComponent.vue';
import BattleComponent from '@/VueComponents/BattleComponent.vue';
import InventoryComponent from '@/VueComponents/InventoryComponent.vue';

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Root',
            component: TownComponent
        },
        {
            path: '/town',
            name: 'Root',
            component: TownComponent
        },
        {
            path: '/battle',
            name: 'Battle',
            component: BattleComponent
        },
        {
            path: '/inventory',
            name: 'Inventory',
            component: InventoryComponent
        }
    ]
});