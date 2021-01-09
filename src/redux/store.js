import {combineReducers, createStore, compose, applyMiddleware} from 'redux'
import filters from "./reducers/filters";
import thunk from "redux-thunk";
import pizzas from "./reducers/pizzas";
import cart from "./reducers/cart";

const rootReducer = combineReducers({
    filters, pizzas, cart
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store;