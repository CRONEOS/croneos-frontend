<template>
  <div class="relative-position bg-red">
    <!-- <q-scroll-area :visible="true" horizontal style="height: 100%; width:100%"> -->
    <vue-code-highlight>{{remote_snippet||code}}</vue-code-highlight>
    <!-- </q-scroll-area> -->
    <q-btn
      v-if="copy"
      class="absolute-top-right q-ma-sm"
      unelevated
      size="sm"
      :icon="iconname"
      round
      color="primary"
      v-clipboard:copy="code"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      <q-tooltip content-class="bg-secondary">
        {{msg}}
      </q-tooltip>
    </q-btn>

  </div>
</template>

<script>
import { component as VueCodeHighlight } from "vue-code-highlight";
import "../css/prism-coy.css"; //ok
// import  '../../node_modules/vue-code-highlight/themes/prism-okaidia.css';//ok
// import  '../../node_modules/vue-code-highlight/themes/prism-tomorrow.css';//ok

export default {
  // name: 'ComponentName',
  components: {
    VueCodeHighlight
  },
  props: {
    code: {
      type: String,
      default: ""
    },
    copy: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      iconname: 'file_copy',
      msg: 'copy',
      remote_snippet: ''
    };
  },
  
  methods: {
    onCopy: function(e) {
      console.log("You just copied: " + e.text);
      this.iconname="check";
      this.msg="success"
      setTimeout(()=>{this.iconname="file_copy"; this.msg="copy"},1000)
    },
    onError: function(e) {
      alert("Failed to copy texts");
    },
    async fetchCodeSnippet(url){
      let res = await this.$axios.get(url);
      console.log(res)
      this.remote_snippet = res.data;
    }
  },
  async mounted(){
    if(this.code.includes('http')){
      this.fetchCodeSnippet(this.code)
    }
  }
};
</script>
