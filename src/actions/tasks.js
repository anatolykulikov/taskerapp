import { createAction } from 'redux-actions';

export const loadStart = createAction('[Tasks] Load start');
export const dataReceived = createAction('[Tasks] Data received');
export const errorOccured = createAction('[Tasks] Error occured');
export const editTask = createAction('[Tasks] Handle Task');

export const load = (dispatch) => {    
    dispatch(loadStart());

    let sendBody = {
        token: localStorage.getItem('_t')
    };

    // Запрос
    fetch('http://localhost:8888/taskapp/wp-json/api/getdata/', {
        method: 'POST',
        body: JSON.stringify(sendBody),
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        dispatch(dataReceived(data));
    }).catch(() => {
        dispatch(errorOccured());
    })
}

function findTask(id, arr) {
    let index = false;
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == id) {
            index = i;
        }
    }
    return index;
}

export const handleTasks = (id, actionTask) => (dispatch, getState) => {
    // Вытаскиваем текущее состояние стора
    const storeState = getState();
    const prevState = storeState.tasks.data;

    // Обрабатываем действие
    switch(actionTask) {

        // Переместить в план
        case 'planned' : {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if(task.id == id) {
                    task.status = 'planned'
                }

                return task;
            })
            // Обновляем состояние
            return dispatch(editTask(nextState));
        }

        // Переместить в работу
        case 'work' : {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if(task.id == id) {
                    task.status = 'work'
                }

                return task;
            })
            // Обновляем состояние
            return dispatch(editTask(nextState));
        }

        // Переместить в завершенные
        case 'complete' : {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if(task.id == id) {
                    task.status = 'complete'
                }

                return task;
            })
            // Обновляем состояние
            return dispatch(editTask(nextState));
        }
        
        // Удаляем задачу
        case 'delete' : {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if(task.id !== id) {
                    return task;
                }
            })
            // Обновляем состояние
            return dispatch(editTask(nextState));
        }

        // Ничего не передано
        default : {
            return dispatch(editTask(prevState));
        }
    }
}