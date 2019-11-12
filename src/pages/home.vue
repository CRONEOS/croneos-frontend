<template>
  <q-page class=" full-height">

    <!-- <div class="diagonal"></div> -->
    <div class="header_box">
      <q-parallax src="./statics/images/bg.jpg" :height="450">
        
            <div class="text-center text-primary" style="">
                <div style="background:#272822F2" class=" text-h3  text-uppercase text-weight-light">Mine Scheduled Actions</div>
                <div class="text-caption bg-primary text-secondary text-weight-bold">* A replacement for deferred transactions on EOS *</div>
                <q-btn to="mine" label="start mining" color="primary" size="lg" class="q-mt-xl" />
            </div> 
        
      </q-parallax>
    </div> 



  <div  class="center-page-content" >

    <div class="q-pa-sm text-white">
      <h5 class="text-center">Background</h5>

      <p>Delayed transactions will be deprecated (EOSIO version xx) due to multiple issues it generates (list some of the issues). We propose CRONEOS as an alternative solution for enabling dapps to schedule future work. Smart contract developers can submit their scheduled tasks to an on chain pool. Miners can then execute these jobs. To align incentives we introduce an optional gas fee (multiple tokens allowed). The executer of the scheduled action will receive a (to be determined) portion of the fee as reward (see more about gas-reward model and relationship with CRON token). </p>

      <p>The project is currently in development. I'm doing this on my own... You want to help? Contact via Github.</p>
      <!-- <p>Croneos is looking for contributers (design infographics, website, community management, ...).</p> -->
      
    </div>

    <div class="row q-col-gutter-lg text-white">
      <div class="col-xs-12 col-sm-6 ">
        <div class="q-pa-sm">
          <h5 class="text-center">Developers</h5>
          <p>Smart contract devs can integrate croneos by including a single header file (c++). only pay optional  fee if the cron job is executed successful else refund (expired, cancelled). Higher fees will increase your odds of on time execution.</p>
          <router-link to="/schedule/developers" tag="a" class="text-link">
            See examples
          </router-link>
          
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 ">
        <div class="q-pa-sm">
          <h5 class="text-center">Miners</h5>
          <p>Monetize your excess CPU by mining scheduled jobs. As a miner you earn rewards for each successful execution. See allowed fee tokens...</p>
        </div>
      </div>

    </div>
  
    <div class="q-pa-sm text-white">
      <h5 class="text-center">Aligning Incentives with Gas</h5>
      <p>Although paying gas is optional we believe it will increase the probability of on time execution. The executer of your scheduled action will be rewarded with 50% (to be determined) of the gas and additional CRON tokens.  Currently the CRONEOS smart contract only accepts the following gas tokens:</p>
      <div class="row">
        <div v-for="token in getAllowedFeeTokens" class="q-mr-sm" :key="token.sym" > {{token.sym}}</div>
      </div>

      <router-link to="/gas-tokens" tag="a" class="text-link">
        Apply for listing your token
      </router-link>
    </div>


    <div class="q-pa-sm text-white">
      <h5 class="text-center">CRON Token</h5>
    </div>
    <p class="text-center">More info about the CRON token soon...</p>
    <!-- <div class="row q-col-gutter-lg text-white q-pa-sm">
      <div class="col-xs-12 col-sm-6 col-md-3">
        <div class="q-pa-sm bg-primary">
            col1
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <div class="q-pa-sm bg-primary">
            col2
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <div class="q-pa-sm bg-primary">
            col3
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-3">
        <div class="q-pa-sm bg-primary">
            col4
        </div>
      </div>

    </div> -->


    <div class="q-pa-sm text-white">
      <h5 class="text-center">...add info graphics...</h5>
      <div class="text-center" >I'm not tallented enough to make these. If you're a designer and want to help, contact me via github.</div>
    </div>




  </div><!-- end center page -->

<div style="height:200px"></div>



    <!-- <div class="row justify-center overflow-hidden" style="">
        <span>Schedule contract actions for execution in the future. Receive rewards by executing scheduled tasks.</span>
    </div>

    <div class="row justify-center overflow-hidden" style="">
        <span>Schedule jobs from whitin your contract with an easy c++ api. Pay an optional  fee to incentivize the miners.</span>
    </div>

    <div class="row justify-center overflow-hidden" style="">
        <span>Use the UI to manage your jobs.</span>
    </div>

    <div class="row justify-center overflow-hidden" style="">
      <ul>
        <li>dapps submit scheduled actions to the pool</li>
        <li>dapps pay a fee (similar to eth ) for each scheduled job</li>
        <li>miners execute the scheduled jobs and receive rewards (CRON token and %  fee)</li>
      </ul>
    </div> -->



  </q-page>
</template>

<style>
</style>

<script>
import { mapGetters } from "vuex";


export default {
  name: "PageIndex",
  components: {
    
  },
  data() {
    return {
      showYouTubeVideo: false,
      video_is_loaded: false
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getAllowedFeeTokens: "app/getAllowedFeeTokens"
    })
  },
  methods: {
    dologin() {}
  }
};
</script>

<style>
.diagonal {
  height: 400px;
  background-image: url("../statics/images/diagonal.svg");
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -30px;
}
.bottom-info-box {
  width: 304px;
  height: 177px;
  border: 1px solid var(--q-color-secondary);
  border-radius: 8px;
  box-sizing: border-box;
}
.header_box{
  border-bottom: 5px solid  var(--q-color-primary)
}
</style>
