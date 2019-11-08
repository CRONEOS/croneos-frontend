<template>
  <q-layout view="lhh Lpr fff">
    <q-header :elevated="true" reveal>
      <q-toolbar style="height:60px" class="bg-secondary" >
        <router-link to="/" class="row items-center">
          <img  src="~assets/croneos-logo.svg" style="height:24px" class="cursor-pointer"/>
        </router-link>
        <!-- <img v-else src="~assets/eosdac-logo-notext.svg" style="height:45px"/> -->
        
        <q-toolbar-title>
          
        </q-toolbar-title>

        <q-tabs shrink stretch class="q-mr-sm" indicator-color="primary" align="right">
          <q-route-tab  label="mine" to="/mine" />
          <q-route-tab  label="schedule" to="/schedule" />
          <q-route-tab  label="rewards" to="/rewards" />
        </q-tabs>
        
        <login-btn />
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

  


    <q-page-container class="text-black" style="background: #D7D6DC">

      <router-view />
      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>
    </q-page-container>

    <q-footer class="bg-secondary" style="height:100px">
      <div style="border-top: 5px solid #3366FF">

    <q-btn dense color="secondary" round  class="q-ml-md">
      <q-tooltip>Visit our Telegram</q-tooltip>
      <q-icon name="img:statics/vectors/social/001-telegram.svg" size="24px"/>
    </q-btn>
    <q-btn dense color="secondary" round  class="q-ml-md">
      <q-tooltip>Visit our Github repos</q-tooltip>
      <q-icon name="img:statics/vectors/social/027-github.svg" size="24px"/>
    </q-btn>

        
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar';
import { mapGetters } from "vuex";
import loginBtn from 'components/ual/login-btn';


export default {
  name: 'MyLayout',
  components:{
    loginBtn
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

</style>
