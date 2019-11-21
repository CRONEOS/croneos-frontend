
export function getRewards (state) {
    return state.rewards;
}

export function getDeposits (state) {
    return state.deposits;
}

//account
export function getCPUStats (state) {
    if(state.account)
    return state.account.cpu_limit;
}


