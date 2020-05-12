import { combineReducers } from 'redux';

// Добавляем reducer'ы
import { reducer as taskReducer } from './tasks.js';

// Создаем корневой reducer
export const rootReducer = combineReducers({
    tasks: taskReducer
});