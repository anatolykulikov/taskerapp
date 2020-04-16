import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

// Экспортируем корневой reducer
import { rootReducer } from 'reducers';

// Создаем store приложения
export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);