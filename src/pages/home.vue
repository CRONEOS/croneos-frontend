<template>
  <q-page class=" full-height bg-secondary">

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



  <div style="max-width:1200px;margin:0 auto" class="" >

    <div class="q-pa-sm text-white">
      <h5 class="text-center">Background</h5>
      <p>Delayed transactions will be deprecated (EOSIO version xx) due to multiple issues it generates (list some of the issues). We propose CRONEOS an alternative solution for dapps being able to schedule future work. ...Align insentives by introducing an optional gass fee for processing scheduled jobs.</p>
    </div>

    <div class="row q-col-gutter-lg text-white">
      <div class="col-xs-12 col-sm-6 ">
        <div class="q-pa-sm">
          <h5 class="text-center">Developers</h5>
          <p>easy c++ api, only pay optional gass fee if the cron job is executed successful else refund (expired, cancelled). Higher gass fees will increase your odds of on time execution. </p>

        </div>
      </div>
      <div class="col-xs-12 col-sm-6 ">
        <div class="q-pa-sm">
          <h5 class="text-center">Miners</h5>
          <p>Monetize your excess CPU by mining scheduled jobs. As a miner you earn rewards for each successful execution. See allowed fee tokens...</p>
          <p>Het is al geruime tijd een bekend gegeven dat een lezer, tijdens het bekijken van de layout van een pagina, afgeleid wordt door de tekstuele inhoud. Het belangrijke punt van het gebruik van Lorem Ipsum is</p>
        </div>
      </div>

    </div>
  

    <div class="row q-col-gutter-lg text-white q-pa-sm">
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

    </div>


    <div class="q-pa-sm text-white">
      <h5 class="text-center">...add info graphics...</h5>

    </div>

    <div class="q-pa-sm text-white">
      <h5 class="text-center">CRON Token</h5>
    </div>

    <div class="q-pa-sm text-white">
      <h5 class="text-center">Founders</h5>
    </div>




  </div><!-- end center page -->

<div style="height:200px"></div>



    <!-- <div class="row justify-center overflow-hidden" style="">
        <span>Schedule contract actions for execution in the future. Receive rewards by executing scheduled tasks.</span>
    </div>

    <div class="row justify-center overflow-hidden" style="">
        <span>Schedule jobs from whitin your contract with an easy c++ api. Pay an optional gass fee to incentivize the miners.</span>
    </div>

    <div class="row justify-center overflow-hidden" style="">
        <span>Use the UI to manage your jobs.</span>
    </div>

    <div class="row justify-center overflow-hidden" style="">
      <ul>
        <li>dapps submit scheduled actions to the pool</li>
        <li>dapps pay a fee (similar to eth gass) for each scheduled job</li>
        <li>miners execute the scheduled jobs and receive rewards (CRON token and % gass fee)</li>
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
      getAccountName: "ual/getAccountName"
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
