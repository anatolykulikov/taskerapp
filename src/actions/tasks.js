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
    const storeState = getState();
    let StoreData = storeState.tasks.data;
    const storeIdTask = findTask(id, StoreData);

    if(storeIdTask) {
        switch(actionTask) {
            case 'delete' : {
                console.log(`Delete element ${storeIdTask}`)
                StoreData.splice(storeIdTask, 1);
            }
        }
    } else {
        console.log(`Element ${storeIdTask} not in store`)
    }
    
    return dispatch(editTask(StoreData));
}