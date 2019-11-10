<template>
  <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 " :style="{order: order}">
    
    <div class="overflow-hidden cronjob rounded-borders   ">
      
      <div class="bg-secondary row justify-center items-center relative-position" style="height:32px">
        <img src="~assets/croneos-logo.svg" style="height:15px" />
        <div class=" absolute-top-right q-ma-xs text-white">
          <q-btn  v-if="slide!='job_details'" flat icon="more_vert" @click="show_job_details" size="xs" round >
            <q-tooltip anchor="center left" self="center right" content-class="bg-primary">
              show details
            </q-tooltip>
          </q-btn>
          <q-btn  v-else flat icon="close" @click="slide='main'" size="xs" round >
          </q-btn>
        </div>
      </div>
      <!-- {{cronjob.tag}} {{cronjob.owner}} -->
      <!-- <pre>{{getTimeStats}}</pre> -->
      <!-- https://quasar.dev/options/transitions -->
      <q-carousel
        v-model="slide"
        :transition-prev="carousel_transition"
        :transition-next="carousel_transition"
        animated
        class="no-padding bg-secondary text-white"
        height="150px"
        
      >
        <q-carousel-slide name="main" class="no-padding">
          <div class="q-pa-xs full-height">
            <div class="column items-center justify-between  full-height ">

              <!-- <div class="text-caption">{{cronjob.actions[0].account}}> {{cronjob.actions[0].name}}</div> -->
              <q-badge color="accent">{{cronjob.actions[0].account}} > {{cronjob.actions[0].name}}</q-badge>

              <div v-if="!getTimeStats.expired" class="full-width">
                <q-linear-progress
                  v-if="getTimeStats.ms_left > 0"
                  :value="getTimeStats.progress/100"
                  size="10px"
                  
                  color="positive"
                >
                  <q-tooltip content-class="bg-secondary">
                    executable in {{secondsToDhms(getTimeStats.ms_left/1000)}}
                  </q-tooltip>
                </q-linear-progress>
                <q-linear-progress
                  v-else
                  :value="getTimeStats.progress_expired/100"
                  size="10px"
                  
                  track-color="positive"
                  color="negative"
                
                >
                  <q-tooltip content-class="bg-secondary">
                    will expire in {{cronjob.expiration}}
                  </q-tooltip>
                </q-linear-progress>
              </div>
              <div v-else class="text-negative">EXPIRED</div>

              <div class="row justify-between full-width">
                <div class="text-caption" >{{cronjob.description}}</div>
              </div>

              <div class="row justify-between full-width q-px-sm">
                <div v-if="!getTimeStats.expired">
                  {{cronjob.gas_fee}}
                </div>
                <div >
                  12359.0000 CRON
                </div>
              </div>


              <div class="q-mt-sm full-width">
                <div v-if="!getTimeStats.expired">
                  <q-btn
                    v-if="getTimeStats.ms_left===0"
                    label="mine"
                    color="primary"
                    @click="executeJob(cronjob.id)"
                    class="full-width"
                    :disabled="getIsTransacting"
                  />
                  <q-btn
                    v-else
                    label="waiting"
                    flat
                    color="negative"
                    class="full-width"
                  />
                </div>
                <div v-else>
                  <q-btn
                    :disabled="getIsTransacting"
                    label="delete"
                    color="negative"
                    @click="executeJob(cronjob.id)"
                    class="full-width"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="executed" class="no-padding">
          <div class="column items-center justify-center full-height">
            <q-icon name="check_circle" color="positive" />
            <span>executed</span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="waiting_for_signature" class="no-padding" @click="slide = 'main'">
          <div class="column items-center justify-center full-height">
            <q-spinner color="primary"/>
            <span>waiting for signature</span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="transaction_error" class="no-padding">
          <div class="column items-center justify-center full-height">
            <q-icon name="error" color="negative" />
            <span>error</span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="transaction_cancelled" class="no-padding">
          <div class="column items-center justify-center full-height">
            <q-icon name="cancel" color="negative" />
            <span>rejected</span>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="job_details" class="no-padding">
          <cronjob-details :cronjob="cronjob" :timestats="getTimeStats"/>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import cronjobDetails from "components/cronjob/cronjob-details";
export default {
  name: "cronjob",
  components:{
    cronjobDetails
  },
  props: {
    cronjob: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      order: 2,
      slide: "main",
      carousel_transition: "fade",

    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getCLOCK: "app/getCLOCK",
      getIsTransacting: "ual/getIsTransacting"
    }),
    getTimeStats() {
      let stats = {
        ms_left: "",
        ms_late: "",
        progress: "",
        progress_expired:0,
        expired: false
      };
      let now = this.getCLOCK;
      let due_date = Date.parse(this.cronjob.due_date + ".000+00:00");
      let submitted = Date.parse(this.cronjob.submitted + ".000+00:00");
      let expiration = Date.parse(this.cronjob.expiration + ".000+00:00");
      let delay = due_date - submitted;
      

      let delta_ms = due_date - now;

      stats.ms_left = delta_ms >= 0 ? delta_ms : 0;
      stats.ms_late = delta_ms >= 0 ? 0 : delta_ms;
      stats.progress = stats.ms_left != 0 ? (100 - ((delta_ms / delay) * 100)).toFixed(2) : 100;
      stats.expired = now > expiration;
      stats.progress_expired =stats.expired && stats.ms_left === 0 ? 100 : ((stats.ms_late*-1 /(expiration - due_date)) *100).toFixed(2)*1;

      if (stats.expired) {
        this.order = 3; //expired
      } else {
        if (this.order != 2 && stats.ms_left > 0) this.order = 2; //waiting
        if (this.order != 1 && stats.ms_left == 0) this.order = 1; //executable
      }

      return stats;
    }
  },
  methods: {
    async executeJob(id) {
      if (this.getAccountName) {
        
        this.slide = "waiting_for_signature";
        
      }

      let actions = [
        {
          account: "piecestest12",
          name: "exec",
          data: {
            executer: this.getAccountName,
            id: id
          }
        }
      ];
      let res = await this.$store.dispatch("ual/transact", {
        actions: actions,
        disable_signing_overlay: true
      });
      // let res = true;
      if (res === undefined) return;
      if (res.wasBroadcast == true) {
        this.slide = "executed";
        setTimeout(() => {
          this.$emit("executed");
          this.$store.dispatch('user/fetchRewards', this.getAccountName);
        }, 1000);
      } else {

        if (res.code == 402) {
          this.slide = "transaction_cancelled";
        } else {
          this.slide = "transaction_error";
        }

        setTimeout(() => {
          this.slide = "main";
        }, 1000);
      }
    },

    secondsToDhms(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600*24));
      var h = Math.floor(seconds % (3600*24) / 3600);
      var m = Math.floor(seconds % 3600 / 60);
      var s = Math.floor(seconds % 60);

      var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    },
    show_job_details(){
      this.is_showing_job_details="true";
      this.carousel_transition="jump-left"
      this.slide="job_details";
      this.carousel_transition="fade"
    }


  },
  mounted() {}
};
</script>

<style>
.cronjob {
  border: 1px solid black;
  background: white;
}
.cron-expired {
  background: #f9ebed;
}
.cron-waiting {
  background: blue;
}
.cron-exec {
  background: #b5e8c1;
}
</style>
