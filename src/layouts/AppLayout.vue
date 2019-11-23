<template>
  <q-layout view="hHh Lpr fff"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header >
      <q-toolbar style="height:60px" class="bg-secondary">

        <q-btn
          flat
          round
          dense
          :icon="leftDrawer?'close': 'menu'"
          @click="leftDrawer = !leftDrawer"
          class="q-mr-sm"
        />
        <main-logo />
        <q-toolbar-title>
          
        </q-toolbar-title>
        <login-network-switcher />
      </q-toolbar>

    </q-header>

    <!-- (Optional) The Footer -->
    <q-footer class="bg-secondary" style="height:100px">
      <div>footer</div>
    </q-footer>

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawer"
      side="left"
      bordered
      content-class="bg-grey-2"

    >
    <q-list>
        <q-item-label v-if="getAccountName" header>Welcome {{getAccountName}}</q-item-label>
        <q-item-label v-else header>Please login</q-item-label>

        <q-item clickable to="/mine" exact>
          <q-item-section avatar>
            <q-icon name="ion-hammer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Miner</q-item-label>
            <q-item-label caption>Dashoard</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <q-item v-if="getAccountName" clickable :to="`/mine/rewards`">
          <q-item-section avatar>
            <q-icon name="ion-logo-usd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Rewards</q-item-label>
           <q-item-label caption>mining stats</q-item-label>
          </q-item-section>
        </q-item> -->


        <q-item clickable to="/schedule" exact>
          <q-item-section avatar>
            <q-icon name="ion-alarm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Schedule</q-item-label>
            <q-item-label caption>dashboard</q-item-label>
          </q-item-section>
        </q-item>

        <!-- <q-item clickable to="/schedule/deposits" exact>
          <q-item-section avatar>
            <q-icon  name="ion-logo-usd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Deposits</q-item-label>
            <q-item-label caption>can be used for gas</q-item-label>
          </q-item-section>
        </q-item> -->

        <q-item clickable to="/docs/getting-started" exact>
          <q-item-section avatar>
            <q-icon name="ion-code-working" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <!-- <q-item-label caption>can be used for gas</q-item-label> -->
          </q-item-section>
        </q-item>


        <q-item clickable to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Go Home</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container class=" text-black bg-grey-2">
      <!-- This is where pages get injected -->
      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import loginNetworkSwitcher from 'components/ual/login-network-switcher';
import mainLogo from 'components/main-logo';
export default {
  // name: 'LayoutName',
  components:{
    loginNetworkSwitcher,
    mainLogo
  },
  data () {
    return {
      leftDrawer: this.$q.screen.gt.sm,
      miniDrawerState: true
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
}
</script>
