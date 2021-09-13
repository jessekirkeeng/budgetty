import axios from 'axios';

let initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

//  ACTION = FUNCTION THAT RETURNS AN OBJ 
//  LIST ACTIONS TYPES
// increment = 'increment'
//     '' decrement
//CREATE THE BASE ACTION TYPES THAT WILL BE USED
const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'


// SET UP AN ACTION CREATOR THAT RETURNS AN ACTION OBJECT WITH A TYPE AND PAYLOAD PROPERTY
export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

export const addPurchase = (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', {
        description,
        price,
        category
    }).then(res => res.data);
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const removePurchase = (id) => {
    let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data);
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export default function budgetReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
        // IN ORDER TO KEEP VALUES PREVIOUSLY STORED ON STATE, WE SPREAD THE CURRENT STATE OBJECT
        // INTO THE RETURNED OBJECT AND UPDATE ONLY THE VALUES IN STATE WE WANT TO CHANGE
            return { ...state, loading: true }
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return { ...state, ...action.payload, loading: false }
        case ADD_PURCHASE + '_PENDING':
            return { ...state, loading: true }
        case ADD_PURCHASE + '_FULFILLED':
            return { ...state, purchases: action.payload, loading: false }
        case REMOVE_PURCHASE + '_PENDING':
            return { ...state, loading: true };
        case REMOVE_PURCHASE + '_FULFILLED':
            return { ...state, loading: false, purchases: action.   payload }
        default:return state;
    }
}

//INITIALIZE SATE 
 // const initial state = {
//     count: 0;
//  }


//  ACTIONS CREATOR FUNCTIONS
// increment = () => {
//     return {
//         type: 'increment'
//     }
// }
//     '' decrement


//  REDUCER FUNCTIONS
// reducer = (state = (state= initialState) => {
//     switch(action.type){
//         case increment: {
//             return{
//                 ...state,
//                 count: state.count + 1
//             }
//         }
//     }
// })
//      '' decrement
