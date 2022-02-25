import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import mainreducer from './reducers'

export const store = createStore(mainreducer, composeWithDevTools(applyMiddleware(thunk)))
