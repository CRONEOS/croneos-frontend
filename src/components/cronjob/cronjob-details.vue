<template>
  <div>
    
    <!-- {{cronjob.owner}}
  {{cronjob.gas_fee}}
  <div>{{cronjob.description}}</div>
    <div>{{timestats}}</div>-->
    <q-separator />
    
    <q-scroll-area :visible="true" :thumb-style="thumbStyle" style="height: 140px; width:100%">
      <div class="q-pa-sm text-caption">{{cronjob.description}}</div>
      <q-separator />
      <q-list separator dense padding class="rounded-borders text-caption no-padding">
        <q-item clickable v-ripple>
          <q-item-section avatar >
            owner
          </q-item-section>
          <q-item-section>{{cronjob.owner}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            contract
          </q-item-section>
          <q-item-section class="no-wrap">{{cronjob.actions[0].account}}</q-item-section>
        </q-item>


        <q-item clickable v-ripple>
          <q-item-section avatar>
            action
          </q-item-section>
          <q-item-section class="no-wrap">{{cronjob.actions[0].name}}</q-item-section>
          <q-item-section avatar>
            <q-btn size="sm" dense icon="ballot" flat color="white" round @click="showActionData">
              <q-tooltip content-class="bg-primary" :delay="500">
                console log action data
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple v-if="cronjob.auth_bouncer">
          <q-item-section avatar>
            miner auth
          </q-item-section>
          <q-item-section>{{cronjob.auth_bouncer}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            gas fee
          </q-item-section>
          <q-item-section>{{cronjob.gas_fee}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            tag
          </q-item-section>
          <q-item-section>{{cronjob.tag || 'x'}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            due date
          </q-item-section>
          <q-item-section>{{cronjob.due_date}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            expiration
          </q-item-section>
          <q-item-section>{{cronjob.expiration}}</q-item-section>
        </q-item>

        <q-item v-for="(auth,i) in cronjob.actions[0].authorization" clickable v-ripple :key="`auth${i}`">
          <q-item-section avatar>
            <span v-if="i==0">authorization</span>
          </q-item-section>
          <q-item-section>{{auth.actor}}@{{auth.permission}}</q-item-section>
        </q-item>



      </q-list>
      <!-- {{cronjob}} -->
    </q-scroll-area>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
  props: {
    cronjob: {
      type: Object,
      default: () => {
        return {};
      }
    },
    timestats: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    ...mapGetters({

    }),
  },
  data() {
    return {
      thumbStyle: {
        right: "0px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75
      }
    };
  },
  methods: {
    async showActionData(){
      console.log('\n', this.cronjob.actions[0].account, ' > ', this.cronjob.actions[0].name)
      const contract = await this.$eos.getContract(this.cronjob.actions[0].account);
      let r = await this.$eos.Serialize.deserializeAction(contract, this.cronjob.actions[0].account, this.cronjob.actions[0].name, this.cronjob.actions[0].authorization, this.cronjob.actions[0].data );
      console.log( JSON.stringify(r,null,2));
  

    }
  }
};
</script>
