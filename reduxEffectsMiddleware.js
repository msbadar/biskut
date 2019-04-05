const reduxEffectsMiddleware =  (effects={}) => {
    return store => next => async action => {
        if (typeof effects[action.type] === "function") {   
            store.dispatch(effects[action.type](action))
        }
        return next(action);
    }
}

export default reduxEffectsMiddleware;