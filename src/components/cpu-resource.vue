<template>
  <div>
    <div v-if="getCPUStats">
      <q-list dense>
        <q-item-label header>CPU</q-item-label>
      <q-item>
        <q-item-section side>
          <q-item-label caption>Available</q-item-label>
        </q-item-section>
          
        <q-item-section>
          {{getCPUStats.parsed.available}}
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label caption>Used</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
          <q-linear-progress
            :value="getCPUStats.perc_used/100"
            size="10px"
            color="primary"
          >
            <q-tooltip content-class="bg-secondary">
              <div>used {{(getCPUStats.perc_used).toFixed(4)}} % </div>
            </q-tooltip>
          </q-linear-progress>
          </q-item-label>
          <q-item-label caption>
            {{getCPUStats.parsed.used}}/{{getCPUStats.parsed.max}}
          </q-item-label>
        </q-item-section>
      </q-item>
      </q-list>

    </div>

    <div v-if="getAccountName && !getCPUStats">loading</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  data() {
    return {
      CLOCK_TIMER: null
    };
  },
  computed: {
    ...mapGetters({
      getCPUStats: "user/getCPUStats",
      getAccountName: "ual/getAccountName"
    }),
    getRelativeCpu: function(){
      if(this.getCPUStats){
        return 100-(this.getCPUStats.available/this.getCPUStats.max*100)
      }
    }
  },
  methods:{

  }
};
</script>
