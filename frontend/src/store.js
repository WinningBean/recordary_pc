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
        groupList: state.groupList === undefined ? null : state.groupList.concat(action.groupAddData),
      };
    case 'MODIFY_GROUP':
      const data = action.groupModifyData;
      var isChangePic = true;
      if (data.group_pic === null) {
        isChangePic = false;
      }
      const changedGroup = state.user.userGroup.map((value) => {
        if (value.group_cd === data.group_cd) {
          if (isChangePic) {
            return {
              ...value,
              group_nm: data.group_nm,
              group_ex: data.group_ex,
              group_pic: data.group_pic,
            };
          } else {
            return {
              ...value,
              group_nm: data.group_nm,
              group_ex: data.group_ex,
            };
          }
        }
        return value;
      });
      return {
        ...state,
        user: { ...state.user, userGroup: changedGroup },
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
