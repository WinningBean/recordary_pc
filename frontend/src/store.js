import { createStore } from 'redux';

const reducer = (state, action) => {
  if (state === undefined) {
    return {
      isLogin: false,
      user: {},
      friendList: undefined,
      groupList: undefined,
      postList: undefined,
    };
  }
  switch (action.type) {
    case 'INIT':
      return {
        isLogin: false,
        user: {},
        friendList: undefined,
        groupList: undefined,
        postList: undefined,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        isLogin: action.loginData,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.userData,
      };
    case 'ADD_GROUP':
      return {
        ...state,
        groupList: state.groupList === undefined ? undefined : state.groupList.concat(action.groupAddData),
      };
    case 'MODIFY_GROUP':
      const data = action.groupModifyData;
      const changedGroup = state.groupList.map((value) => {
        if (value.groupCd === data.groupCd) {
          return data;
        }
        return value;
      });
      return {
        ...state,
        groupList: changedGroup,
      };
    case 'DELETE_GROUP':
      const groupCd = action.groupDeleteCd;
      const copyList = JSON.parse(JSON.stringify(state.groupList)).filter((value) => value.groupCd !== groupCd);
      return {
        ...state,
        groupList: copyList,
      };
    case 'SAVE_FRIENDLIST':
      return {
        ...state,
        friendList: action.friendList,
      };
    case 'SAVE_GROUPLIST':
      return {
        ...state,
        groupList: action.groupList,
      };
    case 'SAVE_FRIEND':
      return {
        ...state,
        friendList: state.friendList === undefined ? state.friendList : state.friendList.concat(action.friend),
      };
    // case 'SAVE_GROUP':
    //   return {
    //     ...state,
    //     groupList: state.groupList === undefined ? state.groupList : state.groupList.concat(action.group),
    //   };
    case 'ADD_POST':
      return {
        ...state,
        postList: state.postList === undefined ? state.postList : state.PostList.concat(action.post),
      };
  }

  return state;
};

const store = createStore(reducer);

export default store;
