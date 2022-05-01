import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools  } from 'redux-devtools-extension';
import reducer from './reducer';

const composeEnhancers = composeWithDevTools({
  // 此处指定名称、actionsBlacklist、actionsCreators 和其他选项
});

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;
