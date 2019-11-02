// import { createStore, applyMiddleware, compose } from 'redux'
// import reducer from './reducer'
// import mySagas from './saga'
// // 1.引入redux-saga
// import createSagaMiddleware from 'redux-saga'
// // 2.创建saga中间件
// const sagaMiddleware = createSagaMiddleware();

// // 3.将 sagaMiddleware 连接至 Store
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__({}) : compose;

// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
// const store = createStore(reducer, enhancer)

// sagaMiddleware.run(mySagas)

// export default store


import { createStore, applyMiddleware, compose } from 'redux'  //  引入createStore方法
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import mySagas from './saga'

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose
const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware))
const store = createStore(reducer, enhancer)

sagaMiddleware.run(mySagas)


export default store  