<template>
  <div>
    <q-card style="width:200px" class="bg-primary-light">
      <q-img :src="dapp.logo"  fit style="height:220px"/>
        <!-- <q-item-section>
          <q-item-label>{{dapp.description}}</q-item-label>
        </q-item-section> -->
      <q-card-actions align="right">
        <q-btn color="primary" label="visit" @click="openURL(dapp.url)">
          <q-tooltip content-class="bg-secondary">
            {{dapp.url}}
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { openURL } from "quasar";
export default {
  name: 'Trusteddapp',
  props: {
    dapp: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {}
  },
  methods:{
    openURL
  }
}
</script>
