import {
    createAction
} from 'redux-actions';

export const loadStart = createAction('[Tasks] Load start');
export const dataReceived = createAction('[Tasks] Data received');
export const errorOccured = createAction('[Tasks] Error occured');
export const editTask = createAction('[Tasks] Handle Task');
export const vieweTask = createAction('[Tasks] View Task');
export const addTask = createAction('[Tasks] Add Task');

export const load = (dispatch) => {
    console.log('load');
    dispatch(loadStart());

    let sendBody = {
        token: localStorage.getItem('_t')
    };

    // Запрос
    fetch('http://localhost:8888/app-task/wp-json/api/getdata/', {
        method: 'POST',
        body: JSON.stringify(sendBody),
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        dispatch(dataReceived(data));
    }).catch((erro) => {
        console.log(erro);
        dispatch(errorOccured());
    })
}

export const handleTasks = (id, actionTask) => (dispatch, getState) => {
    // Вытаскиваем текущее состояние стора
    const storeState = getState();
    const prevState = storeState.tasks.data;

    // Обрабатываем действие
    switch (actionTask) {

        // Переместить в план
        case 'planned': {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if (task.id == id) {
                    task.status = 'planned'
                }

                return task;
            })

            // Обновляем состояние
            saveData(nextState);
            return dispatch(editTask(nextState));
        }

        // Переместить в работу
        case 'work': {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if (task.id == id) {
                    task.status = 'work'
                }

                return task;
            })

            // Обновляем состояние
            saveData(nextState);
            return dispatch(editTask(nextState));
        }

        // Переместить в завершенные
        case 'complete': {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if (task.id == id) {
                    task.status = 'complete'
                }

                return task;
            })

            // Обновляем состояние
            saveData(nextState);
            return dispatch(editTask(nextState));
        }

        // Удаляем задачу
        case 'delete': {
            // Вырезаем из стора задачу
            let nextState = prevState.filter((task) => {
                if (task.id !== id) {
                    return task;
                }
            })

            // Обновляем состояние
            saveData(nextState);
            return dispatch(editTask(nextState));
        }

        // Ничего не передано
        default: {
            return dispatch(editTask(prevState));
        }
    }
}

// Функция сохранения данных в back
function saveData(savedata) {

    let sendBody = {
        data: savedata,
        token: localStorage.getItem('_t')
    };

    // Запрос
    fetch('http://localhost:8888/app-task/wp-json/api/savedata/', {
        method: 'POST',
        body: JSON.stringify(sendBody),
        headers: {
            'content-type': 'application/json'
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })
}

// Отображаем задачку
export const viewTask = (id) => (dispatch) => {
    dispatch(vieweTask(id));
}


// Добавляем задачку
export const createTask = (task) => (dispatch, getState) => {
    // Вытаскиваем текущее состояние стора
    const storeState = getState();
    const nextState = storeState.tasks.data;

    // Добавляем новую задачку
    nextState.push(task);

    // Обновляем данные
    saveData(nextState);
    return dispatch(addTask(nextState));
}