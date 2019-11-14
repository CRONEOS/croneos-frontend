
export function getCLOCK(state){
    return state.CLOCK;
}

export function getSettings(state){
    return state.settings;
}

export function getConfig(state){
    return state.config;
}

// export function getAllowedFeeTokens(state){

//     if(state.settings && state.settings.allowed_fee_tokens){
//         return state.settings.allowed_fee_tokens;
//     }

// }

export function getAllowedFeeTokens(state){

    if(state.allowedFeeTokens.length){
        return state.allowedFeeTokens;
    }

}


