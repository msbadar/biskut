# Biskut

Biskut let's you to connect your redux actions in express js server

### Ations.js from client app
```
dispatch({type: Actions.FECH_DATA, id, xhr: true})    
```

### Express router in server side
```
const api = require("biskut/expressMiddleware")

const handler = async ({id}, req, res, next)=>{
    const data = await DB.findById(id)
       return { 
           type: Actions.POST_CREATE_SUCCESS,
           data
    }
})

const myApi = api({
    [Actions.FECH_DATA] :  handler
})

app.use(myApi)

```

### Features
1. It use action in both server and client to communicate
2. fetches the data from server automatically when dispatches the action
3. Reducer can modify the store immediately for server response  without any extra handler

# Getting started

1. `npm install biskut` in both server and client side
2. Create Actions which can use by both server and client
3. Update your redux midleware
```
import createApiMiddleware from 'biskut/reduxMiddleware';

const store = createStore(reducers, initialState, applyMiddleware(
    thunkmiddleware, .... other middleware,
    createApiMiddleware({ url })
));
```
3. Update server code
```
const expressMiddleware = require("biskut/expressMiddleware")
const Actions = require("../src/Actions.json")

const controller = {
    [Actions.FECH_DATA]: <your handler>
}
app.use(api(handlers));

```
