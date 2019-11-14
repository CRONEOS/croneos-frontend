
export function getCLOCK(state){
    return state.CLOCK;
}

export function getSettings(state){
    return state.settings;
}

export function getConfig(state){
    return state.config;
}

export function getAllowedFeeTokens(state){

    if(state.allowedFeeTokens.length){
        return state.allowedFeeTokens;
    }

}

export function getAllowedFeeTokensSym(state, getters){

    if(state.allowedFeeTokens.length){
        console.log('qddqssdsqd',state.allowedFeeTokens)
        let res = state.allowedFeeTokens.map(aft =>{
            let logo = getters.getConfig.tokens.find(t => t.symbol == aft.sym && t.account == aft.contract);
            logo = logo ? logo.logo : './statics/images/tokens/default.png';
            aft.logo = logo;
            return aft;
        })

        return res;
    }
    else{
        return []
    }

}


