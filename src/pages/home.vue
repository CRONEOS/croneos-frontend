<template>
  <q-page class=" full-height">
    <!-- <div class="diagonal"></div> -->
    <div class="header_box relative-position">
      <q-parallax src="./statics/images/bg.jpg" :height="450">
        <div class="text-center text-primary" style="">
          <div
            style="background:#272822F2"
            class=" text-h3  text-uppercase text-weight-light"
          >
            Mine Scheduled Actions
          </div>
          <div class="text-caption bg-primary text-secondary text-weight-bold">
            * A replacement for deferred transactions on EOSIO chains *
          </div>
          <q-btn
            to="mine"
            label="start mining"
            color="primary"
            size="lg"
            class="q-mt-xl"
          />
        </div>
      </q-parallax>
      <div class="row absolute-bottom-right">

        <div class=" text-caption q-pa-xs q-ma-xs bg-secondary" style="opacity:0.9">
          <span>Total</span>
          <span v-if="getContractState" class="text-weight-bold">{{getContractState.schedule_count}}</span>
          <q-spinner v-else />
          <q-tooltip :delay="500" content-class="bg-primary">Total number of received jobs</q-tooltip>
        </div>
        <div class=" text-caption q-pa-xs q-ma-xs bg-primary" style="opacity:0.9">
          <span>Active </span>
          <span v-if="getNumberOfCronjobs!=''" class="text-weight-bold">{{ getNumberOfCronjobs || 0 }}</span>
          <q-spinner v-else />
          <q-tooltip :delay="500" content-class="bg-primary">Jobs waiting to be executed</q-tooltip>
        </div>
        <div class=" text-caption q-pa-xs q-ma-xs bg-secondary" style="opacity:0.9">
          <span>Executed </span>
          <span v-if="getContractState" class="text-weight-bold">{{getContractState.exec_count}}</span>
          <q-spinner v-else />
          <q-tooltip :delay="500" content-class="bg-primary">Number of jobs executed by miners</q-tooltip>
        </div>
        <div class=" text-caption q-pa-xs q-ma-xs bg-secondary" style="opacity:0.9">
          <span>Cancelled </span>
          <span v-if="getContractState" class="text-weight-bold">{{getContractState.cancel_count}}</span>
          <q-spinner v-else />
          <q-tooltip :delay="500" content-class="bg-primary">Number of jobs cancelled by it's the owner</q-tooltip>
        </div>
        <div class=" text-caption q-pa-xs q-ma-xs bg-secondary" style="opacity:0.9">
          <span>Expired </span>
          <span v-if="getContractState" class="text-weight-bold">{{getContractState.expired_count}}</span>
          <q-spinner v-else />
          <q-tooltip :delay="500" content-class="bg-primary">Number of expired jobs</q-tooltip>
        </div>


      </div>

    </div>

    <div class="bg-secondary q-pb-xl">
      <div class="q-pa-sm text-white center-page-content">
        <h5 class="text-center text-weight-light">Background</h5>

        <p>
          Delayed transactions will be deprecated (EOSIO version xx) due to
          multiple <a href="https://github.com/EOSIO/spec-repo/blob/master/esr_deprecate_deferred.md" class="text-link" target="_blank">issues</a> it generates. We propose
          CRONEOS as an alternative solution for enabling dapps to schedule
          future work. Smart contract developers can submit their scheduled
          tasks to an on chain pool. Miners can then execute these jobs. To
          align incentives we introduce an optional gas fee (see gas tokens). The executer of the scheduled action will receive a (to be
          determined) portion of the fee as reward.
        </p>

        <p>
          The project is currently available as beta release (mainnet, jungle). Croneos will be managed by a DAC in the not too distant future.
        </p>
        <!-- <p>Croneos is looking for contributers (design infographics, website, community management, ...).</p> -->
      </div>
    </div>

    <div class="bg-primary-light q-pb-xl">
      <div class="q-pa-sm text-black center-page-content">
        <h5 class="text-center text-weight-light">Decentralized & Trustless</h5>
        <p>
          The execution of the scheduled jobs don't depend on a single entity.
          Anyone can execute jobs from the pool. When using croneos for your
          scheduled tasks you don't need to rely on scripts or non native
          services that can fail or yield unwanted constrains. Croneos is a base layer solution for scheduled
          jobs and lives entirly on the main chain.
        </p>
      </div>
    </div>

    <div class="bg-secondary q-pb-xl">
      <div class="q-pa-sm text-black center-page-content">
        <div class="row q-col-gutter-lg text-white">
          <div class="col-xs-12 col-sm-6 ">
            <div class="q-pa-sm">
              <h5 class="text-center text-weight-light">Developers</h5>
              <p>
                Smart contract devs can integrate croneos by including a single
                header file (c++) to make it easy to interact with the croneos
                smart contract. The api to schedule jobs is very similar to
                normal inline transactions. You'll need to configure the execution time and add an optional gas fee. Your jobs will be added to an on-chain pool that is watched by miners.
              </p>
              <router-link to="/docs/getting-started" tag="a" class="text-link">
                Get started
              </router-link>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 ">
            <div class="q-pa-sm">
              <h5 class="text-center text-weight-light">Miners</h5>
              <p>
                Monetize your excess CPU by mining scheduled jobs. As a miner
                you earn rewards for each successful execution. We encourage automated mining bots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-primary-light q-pb-xl">
      <div class="q-pa-sm text-black center-page-content">
        <div class="q-pa-sm">
          <h5 class="text-center text-weight-light">
            Aligning Incentives with Gas
          </h5>
          <p>
            Although paying gas is optional we believe it will increase the
            probability of on time execution. The executer of your scheduled
            action(s) will be rewarded with % (to be determined) of the gas. Currently the CRONEOS smart contract
            accepts the following gas tokens:
          </p>
          <gas-tokens />

          <router-link to="/gas-tokens" tag="a" class="text-link">
            Apply for listing your token
          </router-link>
        </div>
      </div>
    </div>

    <div class="q-pa-sm text-white">
      <h5 class="text-center text-weight-light">CRON Token</h5>
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

    <!-- <div class="q-pa-sm text-white">
      <h5 class="text-center text-weight-light">...Design and infographics...</h5>
      <div class="text-center">
        I'm not tallented enough to design nice websites let alone infographics. Also English isn't my native language so text improvements are needed too :-). If you feel you can add value, please reach out via our telegram.
      </div>
    </div> -->

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

<style></style>

<script>
import { mapGetters } from "vuex";
import gasTokens from "components/gas-tokens";

export default {
  name: "PageIndex",
  components: {
    gasTokens
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
      getNumberOfCronjobs: "app/getNumberOfCronjobs",
      getContractState: "app/getContractState"
    })
  },
  methods: {
    fetchContractState() {
      this.$store.dispatch('app/fetchContractState');
    }
  },
  mounted(){
    this.fetchContractState();
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
.header_box {
  border-bottom: 5px solid var(--q-color-primary);
}
</style>
