import valueOrDefault from '../utils/value-or-default';
import {
    TASKS_LOADING,
    TASKS_LOAD,
    TASKS_ADD_TASK,
} from '../actions';

export const initialState = {
    loading: false,
    tasks: ['task 1', 'task 2'],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case TASKS_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case TASKS_LOAD:
            return {
                ...state,
                tasks: action.value
            };
        case TASKS_ADD_TASK:
            return {
                ...state,
                tasks: state.tasks.concat(action.task),
            };
        default:
            return state;
    }
};
