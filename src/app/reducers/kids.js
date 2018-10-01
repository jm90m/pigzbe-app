import valueOrDefault from '../utils/value-or-default';
import {
    KIDS_LOADING,
    KIDS_LOAD,
    KIDS_PARENT_NICKNAME,
    KIDS_NUM_TO_ADD,
    KIDS_ADD_KID,
    KIDS_BALANCE_UPDATE,
    KIDS_LOADING_TASK,
    KIDS_ASSIGN_TASK,
    KIDS_LOADING_GOAL,
    KIDS_ASSIGN_GOAL,
    KIDS_UPDATE_GOAL,
    KIDS_DELETE_GOAL,
    KIDS_COMPLETE_TASK,
    KIDS_DELETE_TASK,
    KIDS_LOADING_ALLOWANCE,
    KIDS_ADD_ALLOWANCE,
    KIDS_DELETE_ALLOWANCE,
    KIDS_UPDATE_ALLOWANCE,
    KIDS_SENDING_WOLLO,
    KIDS_SEND_ERROR,
    KIDS_SEND_COMPLETE,
} from '../actions';

const kidDefaults = {
    name: null,
    address: null,
    photo: null,
    balance: null,
    dob: null,
    tasks: [],
    goals: [],
    allowances: [],
};

const saveExclude = [
    'loading',
    'taskLoading',
    'goalLoading',
    'allowanceLoading',
    'sendingWollo',
    'sendError',
    'sendComplete',
];

export const initialState = {
    loading: false,
    taskLoading: false,
    goalLoading: false,
    allowanceLoading: false,
    sendingWollo: null,
    sendError: null,
    sendComplete: null,
    parentNickname: '',
    numKidsToAdd: 0,
    numKidsAdded: 0,
    kids: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case KIDS_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case KIDS_LOAD:
            return Object.keys(initialState)
                .filter(key => !saveExclude.includes(key))
                .reduce((ob, key) => {
                    ob[key] = valueOrDefault(action[key], state[key]);
                    return ob;
                }, {});
        case KIDS_PARENT_NICKNAME:
            return {
                ...state,
                parentNickname: action.parentNickname,
            };
        case KIDS_NUM_TO_ADD:
            return {
                ...state,
                numKidsToAdd: action.numKidsToAdd,
                numKidsAdded: 0,
            };
        case KIDS_ADD_KID:
            return {
                ...state,
                kids: state.kids.concat({
                    ...kidDefaults,
                    ...action.kid
                }),
                numKidsToAdd: state.numKidsToAdd - 1,
                numKidsAdded: state.numKidsAdded + 1,
            };
        case KIDS_SENDING_WOLLO:
            return {
                ...state,
                sendingWollo: action.address
            };
        case KIDS_SEND_ERROR:
            return {
                ...state,
                sendError: action.error
            };
        case KIDS_SEND_COMPLETE:
            return {
                ...state,
                sendComplete: action.address
            };
        case KIDS_BALANCE_UPDATE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.address) {
                        return {
                            ...k,
                            balance: action.balance
                        };
                    }
                    return k;
                }),
            };
        case KIDS_LOADING_TASK:
            return {
                ...state,
                taskLoading: action.value
            };
        case KIDS_ASSIGN_TASK:
            console.log('REDUCER KIDS_ASSIGN_TASK', action.data);
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        return {
                            ...k,
                            tasks: k.tasks.concat({...action.data}),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_LOADING_GOAL:
            return {
                ...state,
                goalLoading: action.value
            };
        case KIDS_ASSIGN_GOAL:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.kid.address) {
                        return {
                            ...k,
                            goals: (k.goals || []).concat({...action.goal}),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_UPDATE_GOAL:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.kid.address) {
                        return {
                            ...k,
                            goals: k.goals.map(goal => {
                                if (goal.address === action.goal.address) {
                                    return {
                                        ...goal,
                                        name: action.goal.name,
                                        reward: action.goal.reward,
                                    }
                                }
                                return goal;
                            })
                        };
                    }
                    return k;
                }),
            };
        case KIDS_DELETE_GOAL:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.kid.address) {
                        return {
                            ...k,
                            goals: k.goals.filter(goal => {
                                return goal.address !== action.goal.address;
                            }),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_COMPLETE_TASK:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        return {
                            ...k,
                            tasks: k.tasks.filter(t => t.transaction !== action.data.task.transaction),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_DELETE_TASK:
            console.log('REDUCER KIDS_DELETE_TASK', action.data);
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        console.log('task.task', k.tasks, 'action.data.task', action.data.task);
                        console.log('filtered tasks:', k.tasks.filter(task => {
                            return task.transaction !== action.data.task.transaction;
                        }));
                        return {
                            ...k,
                            tasks: k.tasks.filter(task => {
                                return task.transaction !== action.data.task.transaction;
                            }),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_LOADING_ALLOWANCE:
            return {
                ...state,
                allowanceLoading: action.value
            };
        case KIDS_ADD_ALLOWANCE:
            console.log('REDUCER KIDS_ADD_ALLOWANCE', action.data);
            return {
                ...state,
                kids: state.kids.map(k => {
                    // if no child name is passed the assign tasks to all kids
                    // this is the case when part of the initial add children process
                    if (!action.kid || k.address === action.kid.address) {
                        return {
                            ...k,
                            allowances: k.allowances.concat({
                                id: k.allowances.length === 0 ? 1 : (k.allowances[k.allowances.length - 1].id + 1),
                                ...action.data
                            }),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_DELETE_ALLOWANCE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        return {
                            ...k,
                            allowances: k.allowances.filter(allowance => {
                                return allowance.id !== action.data.allowance.id;
                            }),
                        };
                    }
                    return k;
                }),
            };
        case KIDS_UPDATE_ALLOWANCE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.data.kid.address) {
                        return {
                            ...k,
                            allowances: k.allowances.map(allowance => {
                                if (allowance.id === action.data.allowance.id) {
                                    return action.data.allowance
                                }
                                return allowance;
                            }),
                        };
                    }
                    return k;
                }),
            };
        default:
            return state;
    }
};