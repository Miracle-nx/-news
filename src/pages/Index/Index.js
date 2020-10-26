import React, { Component } from "react";
import axios from "axios";
// import from "../../assets/CSS/index.css";
export default class Index extends Component {
  constructor() {
    super();
    this.n = 0; //到底次数
    this.isReq = true; //开关管理请求的时候只能每次走一次
    this.state = {
      // 初始化数据list
      list: [],
    };
  }
  componentDidMount() {
    // 请求数据  ----请求走的时候 每次只能走一次
    axios({
      url: "/api/4/stories/latest",
      method: "get",
    }).then((res) => {
      console.log(res);
      // 取出来的数据格式不是我们想要的 只是一天的拿来赋值
      let list = this.state.list;
      list.push({
        time: "今日新闻",
        data: res.data.stories,
      });
      // setState把数据放回去
      this.setState(
        {
          list: list,
        },
        () => {
          console.log(list, "123");
          //在setsaatte的回调函数里log值
        }
      );
    });

    //   2、获取文档的高度window事件  上卷距离 文档高度  窗口高度 预留高度
    window.onscroll = () => {
      // st+wh+50=dh
      let sh = document.documentElement.scrollTop || document.body.scrollTop;
      let wh = document.documentElement.clientHeight; //屏幕窗口可视宽高 ----其实文档很长只是用户看不见
      let dh = document.documentElement.offsetHeight; //文档的占位宽高
      //dt 和wt是固定的
      if (sh + wh + 50 >= dh && this.isReq) {
        this.isReq = false; //进来一个人把门关上  设置完 值 之后再打开门
        //到底的时候看一下这个请求开关关没关
        this.n++;
        // let times=this.getTimes(2);//{reqTime: "20201025", showTime: "10月24日"}
        let times = this.getTimes(this.n);
        // console.log(times);
        console.log("到底了"); 
        axios({
          url: "/api/4/stories/before/" + times.reqTime,

          //   请求到之前的数据之后 在原来的list上加一条
        }).then((res) => {
          //   console.log(res.data.stories, "res")
          this.setState({
            list: [
              ...this.state.list,
              { time: times.showTime, data: res.data.stories },
            ],
          },()=>{
            //   在setState的回调里面进行再次允许下一次请求进来
            this.isReq = true;
          });
          
        });
        // 发请求用的是n-1天前的时间
        //  到底之后要获取昨天的消息了
        // ================
        // 1、 我的时间今天展示    请求的参数是
        //  到底次数默认为0   数据是那一天的       请求的时间     展示的时候
        // 第一次请求     拿23的数据        24         展示23时间
        // 2      今天25号      23号是两天前    24 是一天前
        // n        拿n天前的数据  n-1的前的时间    n天前的时候
      }
    };
  }
  //计算请求时候  展示时间
  getTimes(n) {
    // 请求时间是n-1天前的 时间对象
    let now = new Date(); //Mon Oct 26 2020 10:19:22 GMT+0800 当前时间

    let nowChuo = now.getTime(); //1603679109476
    let reqChuo = nowChuo - (n - 1) * 24 * 60 * 60 * 1000; //1603592458652 几天前那一刻的毫秒数--时间戳
    let reqDate = new Date(reqChuo); //事件对象
    let reqYear = reqDate.getFullYear();
    let reqMonth = (reqDate.getMonth() + 1 + "").padStart(2, "0");
    let reqDay = (reqDate.getDate() + "").padStart(2, "0");
    let req = (n - 1) * 24 * 60 * 60 * 1000; //毫秒数
    let reqTime = reqYear + reqMonth + reqDay; //请求时间
    console.log(req, ":n-1");
    // 展示的时间是n天前的时间

    let showChuo = nowChuo - n * 24 * 60 * 60 * 1000; //1603592458652 几天前那一刻的毫秒数--时间戳
    let showDate = new Date(showChuo); //事件对象
    let showYear = showDate.getFullYear();
    let showMonth = (showDate.getMonth() + 1 + "").padStart(2, "0");
    let showDay = (showDate.getDate() + "").padStart(2, "0");
    let show = (n - 1) * 24 * 60 * 60 * 1000; //毫秒数
    let showTime = showMonth + "月" + showDay + "日"; //请求时间
    return {
      reqTime,
      showTime,
    };
  }
  // window事件置空
  componentWillUnmount() {
    window.onload = null;
  }
  render() {
    const { list } = this.state;
    return (
      <div>
        <div className="header"></div>
        <div className="banner"></div>
        <div className="list">
          {/* 遍历数据 */}
          {list.map((item) => {
            return (
              <div key={item.time}>
                <h1>{item.time}</h1>
                {item.data.map((i) => {
                  return (
                    <div key={i.id}>
                      <h2>{i.title}</h2>
                      <img src={i.images[0]} alt="" />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
