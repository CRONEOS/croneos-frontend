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
    <q-footer class="bg-secondary">
      <!-- <footer-content /> -->
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
            <q-item-label>Mineables</q-item-label>
            <q-item-label caption>list scheduled jobs</q-item-label>
          </q-item-section>
        </q-item>

        <q-item v-if="getAccountName" clickable :to="`/mine/statistics/${getAccountName}`">
          <q-item-section avatar>
            <q-icon name="ion-logo-usd" />
          </q-item-section>
          <q-item-section>
            <q-item-label>My Rewards</q-item-label>
            <q-item-label caption>mining stats</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/mine/mining-bot" exact>
          <q-item-section avatar>
            <q-icon name="img:statics/vectors/bot.svg" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Mining bot</q-item-label>
            <q-item-label caption>run a mining bot</q-item-label>
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

    <q-page-container style="background: #3B3B3B">
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { mapGetters } from "vuex";
import loginNetworkSwitcher from 'components/ual/login-network-switcher';
import mainLogo from 'components/main-logo';
// import footerContent from 'components/footer-content';
export default {
  // name: 'LayoutName',
  components:{
    loginNetworkSwitcher,
    mainLogo
    // footerContent
  },
  data () {
    return {
      leftDrawer: this.$q.screen.gt.md,
      miniDrawerState: true,
      CLOCK_TIMER: null
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  mounted(){
    this.$store.dispatch('cronjobs/fetchCronjobs');

    if(!this.CLOCK_TIMER || !this.getCLOCK){
      this.$store.commit("app/setCLOCK", new Date().getTime());
      this.CLOCK_TIMER = setInterval(() => {
          this.$store.commit("app/setCLOCK", new Date().getTime());
      }, 1000);
    }
  },
  destoyed(){
    clearInterval( this.CLOCK_TIMER );
    this.CLOCK_TIMER = null;
  },
}
</script>
