"use client"

import { useEffect, useRef, useState } from "react";



export default function Page() {
  const [imageList, setImageList] = useState([])
  const [maskIndex, setMaskIndex] = useState(-1)
  const [pre, setPre] = useState(0);
  let loadingFlag = useRef<boolean>(false)
  let currentPageIndex = useRef<number>(0)
  

  useEffect(() => {
    // fetch("http://localhost:3000/api/instagram")
    //     .then(response => response.json())
    //     .then(reaData => {
    //       setImageList(reaData.data)
    //       console.log("ImageList Length", imageList.length)
    //     })
    if(localStorage.getItem("imageList")){
      localStorage.removeItem("imageList")
    }

    getData()
  }, [])

  // 节流函数
  const throttle =
    (fn:any, delay:number) =>
    (...rest:any) => {
      const current = Date.now();
      if (current - pre > delay ) {
        fn(rest);
        setPre(current);
      }
    };
                

  const getData =  async () => {
    // const data = await fetch("http://localhost:3000/api/instagram")
    // console.log("data", data.json())
    if(loadingFlag.current) {return;}

    // if(imageList.length >= 50) {return}
    // console.log("currentPageIndex", currentPageIndex.current)
    let temp = localStorage.getItem("imageList")
    if(temp && JSON.parse(temp).length >= 100){
      return;
    }

    loadingFlag.current = true

    // console.log("BASE_URL", (process.env.BASE_URL))
    const res = await fetch(process.env.BASE_URL + "/api/instagram?start="+ currentPageIndex +"&timestamp=" + new Date().getTime(),{ cache: 'no-cache' })
    const resData = await res.json()
    console.log("reaData.data", resData.data)
    loadingFlag.current = false
    if(resData && resData.data ){
      // console.log("data load")
      // debugger;
      // const nextItems = [...imageList, ...resData.data];
      // console.log("data load", [...imageList])
      // setImageList(imageList.concat(resData.data))
      if(temp){
        const newList = JSON.parse(temp).concat(resData.data)
        setImageList(newList)
        localStorage.setItem("imageList", JSON.stringify(newList))
      }
      else{
        const newList = [].concat(resData.data)
        setImageList(newList)
        localStorage.setItem("imageList", JSON.stringify(newList))
      }
      
      
    }
    
    // fetch(process.env.BASE_URL + "/api/instagram?start="+ currentPageIndex +"&timestamp=" + new Date().getTime(),{ cache: 'no-cache' })
    //     .then(response => response.json())
    //     .then(reaData => {
    //       // console.log("reaData.data", reaData.data)
    //       // if(imageList.length >= 50) {return}
    //       setImageList(imageList.concat(reaData.data))
    //       // console.log("temp Length", imageList.length)
    //       // currentPageIndex.current = currentPageIndex.current + 1
    //       // console.log("reaData Length", reaData.data.length)
    //       // console.log("ImageList Length", temp.concat(reaData.data).length)
    //       // loadingFlag.current = false
    //       // currentPageIndex.current = currentPageIndex.current + 1
    //       // console.log("loadingFlag", loadingFlag)
    //     })
    //     .catch((err) => {
    //       // loadingFlag.current = false
    //       console.log(err)
    //     })
    //     .finally(()=>{
    //       // loadingFlag.current = false
    //       // clearTimeout(timeoutIndex.current)
    //     })
  }

  const handleScroll = async (e: Event) => {
    // console.log("messgeContainer-event", e)


    //变量scrollTop是滚动条滚动时，距离顶部的距离
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //变量windowHeight是可视区的高度
    const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //变量scrollHeight是滚动条的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    // 滚动条偏移量 
    // let offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop; 

    // const scrollHeight = document.getElementById('data-container')?.scrollHeight
    // const clientHeight = document.getElementById('data-container')?.clientHeight
    // const scrollTop = document.getElementById('data-container')?.scrollTop
    // const offsetHeight = document.getElementById('data-container')?.offsetHeight
    // const distince = (scrollHeight ?? 0) -  (scrollTop ?? 0)
    // console.log("messgeContainer-clientHeight", clientHeight)
    // console.log("messgeContainer-scrollTop", scrollTop)
    // console.log("messgeContainer-windowHeight", windowHeight)
    // console.log("messgeContainer-scrollHeight", scrollHeight)
    // console.log("messgeContainer-scrollHeight", scrollHeight)
    // const msgOffsetTop = document.getElementById('messageTip')?.offsetTop
    // console.log("messageTip-offsetTop", msgOffsetTop)
    if (scrollHeight && windowHeight && scrollTop && (scrollHeight - windowHeight - scrollTop < 50)) {
      console.log("reload")
      // if(loadingFlag.current) {return;}
      
      // await getData()
      // if(timeoutIndex.current && timeoutIndex.current > 0){
      //   return
      // }
      // else{
         throttle(getData, 1000)();
          // setTimeout(getData, 3000)
      // }  
    }

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true)
    // window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      // window.addEventListener('wheel', handleWheel)
    }
  })

  const showMak = (index:number) => {
    setMaskIndex(index)
  }

  const hideMak = () => {
    setMaskIndex(-1)
  }

  

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="h-16 fixed top-0 left-0 right-0 z-[999] bg-white flex 
       items-center justify-center">
        <div className="w-[930px] flex justify-between">
          <div>
          <img src="/instagram.jpg" className="w-28 h-8 cursor-pointer"></img>
          </div>

          <div>
            <span className="px-4 py-2 rounded-lg text-white bg-blue-500 text-base font-medium cursor-pointer hover:bg-blue-600">Log In</span>
            <span className="px-4 py-2 text-blue-500 text-base cursor-pointer text-sm font-medium hover:text-black">Sign Up</span>
          </div>
        </div>
        
      </div>
      <hr className="w-full mt-16"/>
      <div className="mt-10" >

        <div className="flex">
          <img src="https://picsum.photos/id/65/152/152" className="rounded-full" ></img>
          <div className="ml-5 flex flex-col justify-center">
            <span className="text-black text-3xl">#houseplants</span>
            <span className="text-black text-base font-semibold">10,503,837</span>
            <span className="text-black text-base">posts</span>
          </div>
        </div>
        
        <h2 className="mb-2.5 text-gray-500 mt-10">Top posts</h2>

        <div className="grid grid-cols-3 gap-2">
        {
          imageList.map((item:any, index : number) => {
            return (
              <div key={index} className="cursor-pointer relative" onMouseEnter={
                () => showMak(index) } 
                onMouseLeave={hideMak}>
                <img src={item.imageUrl} />
                {
                  maskIndex == index ? (

                    <div className="absolute inset-0 z-99 w-full h-full bg-black opacity-30
                      flex justify-center items-center">
                        <img src="/love.png" className="w-4 h-4 opacity-100"/>
                        <span className="text-white font-bold text-sm ml-2">{item.loveCount}</span>
                        <img src="/comment.png" className="w-4 h-4 opacity-100 ml-2" />
                        <span className="text-white font-bold text-sm ml-2">{item.commentCount}</span>
                    </div>
                  ) : ''
                }
                
              </div>
            )
            
          })
        }
      
        </div>

        {
          imageList.length >= 100 ? (
            <div className="cursor-pointer text-center text-base mt-2.5">已经加载最多数据</div>
          ) : ''
        }
        
      </div>
      
      

    </div>
  )
  
}

// This gets called on every request
// export const getServerSideProps = async () => {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/instagram`)
//   const data = await res.json()
//   console.log("data", data)
//   // Pass data to the page via props
//   return { props: { data } }
// }