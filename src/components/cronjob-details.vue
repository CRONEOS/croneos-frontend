<template>
  <div>
    
    <!-- {{cronjob.owner}}
  {{cronjob.gass_fee}}
  <div>{{cronjob.description}}</div>
    <div>{{timestats}}</div>-->
    <q-separator />
    <q-scroll-area :visible="true" :thumb-style="thumbStyle" style="height: 140px; width:100%">
      <q-list dense padding class="rounded-borders text-caption no-padding">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="account_circle" />
          </q-item-section>
          <q-item-section>{{cronjob.owner}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="account_circle" />
          </q-item-section>
          <q-item-section>{{cronjob.actions[0].account}}> {{cronjob.actions[0].name}}</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="account_circle" />
          </q-item-section>
          <q-item-section>{{cronjob.gass_fee}}</q-item-section>
        </q-item>

        <q-item v-for="i in 20" clickable v-ripple :key="i">
          <q-item-section avatar></q-item-section>
          <q-item-section>Item</q-item-section>
        </q-item>

      </q-list>
      {{cronjob}}
    </q-scroll-area>
  </div>
</template>

<script>
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
  methods: {}
};
</script>
