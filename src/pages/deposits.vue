<template>
  <q-page padding class="overflow-hidden">
    <h5>Deposits</h5>
    <deposits />
    <q-separator class="q-my-md" />
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import deposits from "components/deposit/deposits";
export default {
  // name: 'PageName',
  components: {
    deposits
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName",
      getConfig: "app/getConfig"
    })
  },
  methods: {
    async processAction() {}
  },
  watch: {
    getAccountName: {
      //   immediate: true,
      //   handler(newVal, oldVal) {
      //     if(this.getAccountName){this.getMyCronJobs();}
      //   },
      // },
    }
  }
};
</script>

<style>
</style>
