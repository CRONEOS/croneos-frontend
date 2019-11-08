<template>
  <q-page padding style="max-width:700px" class="bg-white">
    <!-- content -->
    <h5>Getting Started with Croneos</h5>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    <code-block :code="code" style="max-width:600px"/>

    <h5>Recursive Scheduling</h5>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
    <code-block :code="code" style="max-width:600px"/>

    <h5>More Examples</h5>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a.</p>
    <code-block :code="code" style="max-width:600px"/>

   

  </q-page>
</template>

<script>
import codeBlock from 'components/code-block';
import { component as VueCodeHighlight } from 'vue-code-highlight';
import  '../../node_modules/vue-code-highlight/themes/prism-coy.css';//ok
// import  '../../node_modules/vue-code-highlight/themes/prism-okaidia.css';//ok
// import  '../../node_modules/vue-code-highlight/themes/prism-tomorrow.css';//ok
import { mapGetters } from "vuex";
export default {
  // name: 'PageName',
  components:{
    codeBlock,
    VueCodeHighlight

  },
  data() {
    return {
      code: `    ACTION eosscheduler::delsettings(){
      require_auth(get_self());
      settings_table _settings(get_self(), get_self().value);
      //auto settings = _settings.get();
      _settings.remove();

    }`
    };
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"
    })
  },
  methods: {
    
  }
}
</script>

<style>
</style>
