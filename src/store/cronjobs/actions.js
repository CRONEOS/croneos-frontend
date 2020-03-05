
export async function fetchCronjobs ({ state, commit, rootState, rootGetters}) {
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: rootState.app.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
        scope: rootState.app.config[rootGetters["ual/getActiveNetwork"] ].cron_contract,
        table: "cronjobs",
        limit: -1
        // table_key : '',
        // lower_bound : '',
        // upper_bound : '',
        // index_position : 1,
        // key_type : '',
        // reverse : false,
        // show_payer : false,
      });
      console.log(res);
      commit('setCronjobs', res.rows);

}

