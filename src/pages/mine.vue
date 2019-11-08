<template>
  <q-page padding class>
    <!-- content -->
    <q-btn label="reload" color="primary" @click="$store.dispatch('cronjobs/fetchCronjobs');" class="q-mb-md"/>
    <transition-group
      v-if="getCronjobs.length"
      enter-active-class="animated fadeIn"
      leave-active-class="animated zoomOut"
      class="row q-col-gutter-md overflow-hidden"
      tag="div"
    >
      <cronjob
        v-for="(cronjob, i) in getCronjobs"
        :key="cronjob.id"
        :cronjob="cronjob"
        @executed="removeExecutedJob(i)"
      />
    </transition-group>
    <div v-else> No jobs</div>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
import cronjob from "components/cronjob";
export default {
  // name: 'PageName',
  components: {
    cronjob
  },
  data() {
    return {
 

    };
  },
  computed: {
    ...mapGetters({
      getCLOCK: "app/getCLOCK",
      getCronjobs: "cronjobs/getCronjobs"
    })
  },
  methods: {

    removeExecutedJob(e) {
      console.log("job at array position", e, "executed");
      // this.cronjobs.splice(e, 1);
      this.$store.commit('cronjobs/removeCronjobByIndex', e);
    }
  },
  mounted() {

  }
};
</script>

<style>
</style>
