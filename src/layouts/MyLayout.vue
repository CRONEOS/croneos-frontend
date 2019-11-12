<template>
  <q-layout view="lhh Lpr fff">
    <q-header :elevated="true" reveal>
      <q-toolbar style="height:60px" class="bg-secondary" >
        <main-logo />
        <q-toolbar-title>
          
        </q-toolbar-title>

        <q-tabs shrink stretch class="q-mr-sm" indicator-color="primary" align="right">
          <q-route-tab  label="mine" to="/mine" />
          <q-route-tab  label="schedule" to="/schedule" />
        </q-tabs>
        <login-network-switcher />
        <!-- <login-btn /> -->
          <!-- <q-btn
            style="height:32px; width:140px"
            v-if="!getAccountName"
            label="login"
            @click="$store.dispatch('ual/renderLoginModal')"
            color="primary"
            :flat="getShouldRenderLoginModal"
            :loading="getShouldRenderLoginModal"
            
          />
          <q-btn-dropdown v-if="getAccountName" color="white" flat :label="getAccountName" style="width:140px">
            <q-list>
              <q-item clickable dense v-close-popup @click="$store.dispatch('ual/logout')">
                <q-item-section >
                  <q-item-label >Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->

      </q-toolbar>
    </q-header>

  


    <q-page-container class=" text-white bg-secondary" >

      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>



    <q-footer class="bg-secondary footer-border-top"  >
     
      <footer-content />
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters } from "vuex";
import loginBtn from 'components/ual/login-btn';
import loginNetworkSwitcher from 'components/ual/login-network-switcher';
import footerContent from 'components/footer-content';
import mainLogo from 'components/main-logo';

export default {
  name: 'MyLayout',
  components:{
    loginBtn,
    footerContent,
    loginNetworkSwitcher,
    mainLogo
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getShouldRenderLoginModal: "ual/getShouldRenderLoginModal"
    })
  },
  methods: {
    openURL

  }
}
</script>

<style>
.footer-border-top{
  border-top: 5px solid  var(--q-color-primary)
}
</style>
