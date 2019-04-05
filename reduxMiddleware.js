export default ( {url, headers={}}) => {
    return store => next => async action => {
        if (!action.xhr) return next(action);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify(action),
                ...headers
            };
            try {
                next(action)
                const response = await fetch(url, options).then(r => r.json());
                response.type = response.type || "HTTP_ERROR";
                store.dispatch(response)
            } catch (e) {
                store.dispatch({ type: "NETWORK_ERROR", e })
            }
    }
}