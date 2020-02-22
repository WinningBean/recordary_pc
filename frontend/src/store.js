import { createStore } from 'redux';

const reducer = (state, action)=>{
    if(state === undefined){
        return {
            isLogin : false,
            user : {},
        }
    }
    switch(action.type){
        case 'SET_LOGIN':
            return {
                ...state,
                isLogin : action.loginData
            }
        case 'SET_USER':
            return {
                ...state,
                user : action.userData
            }
        case 'ADD_GROUP':
            return {
                ...state,
                user : {...state.user, userGroup : state.user.userGroup.concat(action.groupAddData)}
            }
        case 'MODIFY_GROUP':
            const data = action.groupModifyData;
            var isChangePic = true;
            if(data.group_pic === null){
                isChangePic = false;
            }
            const changedGroup = state.user.userGroup.map(
                (value) => {
                    if (value.group_cd === data.group_cd) {
                        if (isChangePic) {
                            return {
                                ...value,
                                group_nm: data.group_nm,
                                group_ex: data.group_ex,
                                group_pic: data.group_pic,
                            }
                        } else {
                            return {
                                ...value,
                                group_nm: data.group_nm,
                                group_ex: data.group_ex,
                            }
                        }
                    }
                    return value;
                });
            return {
                ...state,
                user : {...state.user, userGroup : changedGroup}
            }
    }
    return state;
}

const store = createStore(reducer);

export default store;