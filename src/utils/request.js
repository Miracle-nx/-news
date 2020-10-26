import axios from "axios";
import qs from "qs";
//响应拦截,
axios.interceptors.response.use((res) => {
    console.group("====请求路径=====" + res.config.url)
    console.log(res)
    console.groupEnd(); 
    return res;
  })

  //请求拦截----携带请求头去请求数据
  axios.interceptors.request.use((req) => {
    // if (config.url != baseUrl + '/api/login') {
    //   // 这个字段是验证登录过期，token里面有时间戳 是一个小时掉线！走请求 后端就会返掉线----只要掉线了 后端告诉我们 我们就要验证有没有掉线告诉用户
    //   config.headers.authorization = store.state.userInfo.token;
    // };
    return req;
  })

//登录接口
export const reqLogin=(from)=>{
  return axios({
    url:"/api/4/stories/latest",
    method:"post",
    data:qs.stringify(from)
  })
}
// export const reqLogin=(from)=>{
//   return axios({
//     url:"/api/4/stories/latest",
//     method:"post",
//     data:qs.stringify(from)
//   })
// }