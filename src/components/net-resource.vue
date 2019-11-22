<template>
  <div>
    <div v-if="getNETStats">
      <q-list dense>
        <q-item-label header>NET</q-item-label>
      <q-item>
        <q-item-section side>
          <q-item-label caption>Available</q-item-label>
        </q-item-section>
          
        <q-item-section>
          {{getNETStats.parsed.available}}
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section side>
          <q-item-label caption>Used</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
          <q-linear-progress
            :value="getNETStats.perc_used/100"
            size="20px"
            color="primary"
          >
            <div class="absolute-full flex flex-center text-black" style="font-size:11px">
              <!-- <q-badge color="primary-light" text-color="accent" :label="(getNETStats.perc_used).toFixed(2)+'%'" /> -->
              {{(getNETStats.perc_used).toFixed(2)+'%'}}
            </div>
          </q-linear-progress>
          </q-item-label>
          <q-item-label caption>
            {{getNETStats.parsed.used}}/{{getNETStats.parsed.max}}
          </q-item-label>
        </q-item-section>
      </q-item>
      </q-list>

    </div>

    <div v-if="getAccountName && !getNETStats">loading</div>
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
      getNETStats: "user/getNETStats",
      getAccountName: "ual/getAccountName"
    }),
    getRelativeCpu: function(){
      if(this.getNETStats){
        return 100-(this.getNETStats.available/this.getNETStats.max*100)
      }
    }
  },
  methods:{

  }
};
</script>
