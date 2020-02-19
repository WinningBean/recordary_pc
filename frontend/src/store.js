import { createStore } from 'redux';

const reducer = (state, action)=>{
    if(state === undefined){
        return {
            user : {},
        }
    }
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user : action.userData
            }
        case 'ADD_GROUP':
            return {
                ...state,
                user : {...state.user, userGroup : state.user.userGroup.concat(action.groupData)}
            }
    }
    return state;
}

const store = createStore(reducer);

export default store;