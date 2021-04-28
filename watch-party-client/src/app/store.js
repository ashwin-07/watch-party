import { configureStore, Action } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer
})

//uncomment to enable hot reloading

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export default store