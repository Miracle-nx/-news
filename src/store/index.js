import { applyMiddleware, createStore } from "redux";
// import {thunk} from "redux-thunk"
import thunk from "redux-thunk";
//1、初始化数据
const initState = {
  banner: [], //1.轮播图
  list: [], //2.1商品列表
};
// 2、reducer函数
function reducer(state = initState, action) {
  switch (action.type) {
    case "changeBanner":
      return {
        ...state,
        banner: action.arr,
      };

    case "changeList":
      return {
        ...state,
        list: action.arr,
      };
    default:
      return state;
  }
}
//实例化一个仓库
const store = createStore(reducer, applyMiddleware(thunk));

export default store;

// 导出数据
export const getBanner = (state) => state.banner;
export const getList = (state) => state.list;

// 1、修改banner的action ----------导出方法
const changeBannerAction = (arr) => {
  return {
    type: "changeBanner",
    arr: arr,
  };
};
// 页面触发的请求
export const reqBanAction=()=>{
  return (dispatch,getState)=>{
    //发请求处理异步
    // reqBan().then(res=>{
    //   // dispatch(changeBannerAction(res.data.list))
    //   dispatch(changeBannerAction([1,2,3]))
    // }) 

  }
}

// 入口文件关联store
