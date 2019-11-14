export function setCLOCK(state, payload){
    state.CLOCK = payload;
}

export function setSettings(state, payload){
    state.settings = payload;
}

export function setAllowedFeeTokens(state, payload){
    state.allowedFeeTokens = payload;
}
