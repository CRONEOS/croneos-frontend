export async function loggedInRoutine ({ dispatch }, payload) {

  dispatch('fetchRewards', payload.accountname);
  dispatch('fetchDeposits', payload.accountname);

}

export async function loggedOutRoutine ({ dispatch, commit }) {
  commit('setRewards', []);
  commit('setDeposits', []);
}


export async function fetchRewards ({ commit, rootState, rootGetters }, accountname) {
    //let account = rootGetters.getAccountName || 
    let res = await this._vm.$eos.rpc.get_table_rows({
        json: true,
        code: rootState.app.config.cron_contract,
        scope: accountname,
        table: "rewards",
        limit: -1

      });
      if(res && res.rows.length){
        console.log(res);
        commit('setRewards', res.rows);
      }
}

export async function fetchDeposits ({ commit, rootState, rootGetters }, accountname) {
  //let account = rootGetters.getAccountName || 
  let res = await this._vm.$eos.rpc.get_table_rows({
      json: true,
      code: rootState.app.config.cron_contract,
      scope: accountname,
      table: "deposits",
      limit: -1

    });
    if(res && res.rows){
      console.log('fetched deposits', res.rows);
      commit('setDeposits', res.rows);
    }
}

