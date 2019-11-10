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
        <router-link to="/" class="row items-center">
          <img  src="~assets/croneos-logo.svg" style="height:24px" class="cursor-pointer"/>
        </router-link>
        <q-toolbar-title>
          
        </q-toolbar-title>
        <login-btn />
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

        <q-item clickable to="/schedule" exact>
          <q-item-section avatar>
            <q-icon name="ion-alarm" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Schedule</q-item-label>
            <q-item-label caption>schedule jobs</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/schedule/deposits" exact>
          <q-item-section avatar>
            <q-icon  name="ion-logo-usd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Deposits</q-item-label>
            <q-item-label caption>can be used for gas</q-item-label>
          </q-item-section>
        </q-item>



        <q-item clickable to="/schedule/developers" exact>
          <q-item-section avatar>
            <q-icon name="ion-code-working" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Developers</q-item-label>
            <q-item-label caption>smart contract integration</q-item-label>
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

    <q-page-container style="background: #D7D6DC">
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
import loginBtn from 'components/ual/login-btn';
export default {
  // name: 'LayoutName',
  components:{
    loginBtn
  },
  data () {
    return {
      leftDrawer: true,
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
