<template>
  <div class="">

    <q-table
      title="My Scheduled Jobs"
      :data="data"
      :columns="columns"
      color="primary"
      row-key="name"
      :grid="false"
      :fullscreen="false"
      :wrap-cells="true"
      no-data-label="You don't have waiting jobs"
      :dense="$q.screen.lt.md"
      selection="none"
      :selected.sync="selected"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            class="text-bold text-primary text-uppercase"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <div>
            {{props.value}}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-extra="props">
        <q-td :props="props">
          <!-- <q-btn color="negative" label="cancel" flat dense size="sm" @click="cancelJob(props.row.id)"/> -->

          <q-btn color="primary" icon="more_vert" flat dense>
            <!-- <q-tooltip content-class="bg-secondary text-white">Close</q-tooltip> -->
            <q-menu>
              <q-list dense style="min-width: 100px">
                <q-item clickable v-close-popup @click="cancelJob(props.row.id)">
                  <!-- <q-item-section avatar>
                    <q-icon name="cancel" />
                  </q-item-section> -->
                  <q-item-section>cancel</q-item-section>
                </q-item>
                <q-item clickable v-close-popup @click="">
                  <q-item-section>view</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>

      <template v-slot:body-cell-contract_action="props">
        <q-td :props="props">
  
          <span>{{props.row.actions[0].account}} > </span>
          <span>{{props.row.actions[0].name}}</span>
        </q-td>
      </template>


    </q-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // name: 'ComponentName',
props:{

  cronjobs:{
    type: Array,
    default: () => []
  }
},
data () {
    return {
      selected: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'job id',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'tag',
          required: false,
          label: 'tag',
          align: 'center',
          field: row => row.tag,
          //format: val => `${new Date(val+'.000Z')}`,
          sortable: true
        },
        {
          name: 'contract_action',
          required: false,
          label: 'action(s)',
          align: 'center',
          //field: row => row.description,
          //format: val => `${new Date(val+'.000Z')}`,
          sortable: false
        },
        {
          name: 'gass_fee',
          required: false,
          label: 'gas fee',
          align: 'center',
          field: row => row.gass_fee,
          //format: val => `${new Date(val+'.000Z')}`,
          sortable: true
        },

        {
          name: 'due_date',
          required: true,
          label: 'scheduled',
          align: 'left',
          field: row => row.due_date,
          // format: val => `${new Date(val+'.000Z')}`,
          sortable: true
        },
        {
          name: 'expiration',
          required: true,
          label: 'expire',
          align: 'left',
          field: row => row.expiration,
          // format: val => `${new Date(val+'.000Z')}`,
          sortable: true
        },
        {
          name: 'submitted',
          required: true,
          label: 'submitted',
          align: 'left',
          field: row => row.submitted,
          // format: val => `${new Date(val+'.000Z')}`,
          sortable: true
        },

        {
          name: 'description',
          required: false,
          label: 'Description',
          align: 'left',
          field: row => row.description,
          //format: val => `${new Date(val+'.000Z')}`,
          sortable: false
        },
        {
          name: 'owner',
          required: false,
          label: 'Owner',
          align: 'left',
          field: row => row.owner,
          //format: val => `${new Date(val+'.000Z')}`,
          sortable: false
        },
        {
          name: 'extra',
          required: false,
          label: '',
          align: 'right',
          //field: row => row.description,
          //format: val => `${new Date(val+'.000Z')}`,
          sortable: false
        },
        // { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        // { name: 'protein', label: 'Protein (g)', field: 'protein' },
        // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: this.cronjobs
    }
  },
  computed: {
    ...mapGetters({
      getAccountName: "ual/getAccountName"

    })
  },
  methods:{
    async cancelJob(id){
      let actions = [
        {
          account: "piecestest12",
          name: "cancel",
          data: {
            owner: this.getAccountName,
            id: id
          }
        }
      ];
      let res = await this.$store.dispatch("ual/transact", { actions: actions });
      if(res){
        this.$emit("executed");
        this.data = this.data.filter(d => d.id != id );
      }
    }
  },

  watch:{
    cronjobs: function(){
      this.data = this.cronjobs;
    }
  }
}
</script>

<style>
</style>
