import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from 'next/server';

type InstagramData = {
  id:           number,
  imageUrl:     string,
  author:       string,
  loveCount:    number,
  commentCount: number,
  timestamp:    number
}

type InstagramResponse = {
  data:    InstagramData[],
  code:    number,
  msg:     string
}

export async function GET(
  req: NextRequest
) {
  // console.log(req.query ?? '')
  // let https://picsum.photos/id/1/200/300
  let instagramList: InstagramData[] = []
  for(let i=0; i<9; i++){
    const d = {
      "id":          13 + i,
      "imageUrl":    "https://picsum.photos/id/" + (13 + i) + "/309/309",
      "author":      "BruceLee" + i,
      "loveCount": 48,
      "commentCount": 212,
      "timestamp": new Date().getTime()
    }
    instagramList.push(d)
  }

  const instagramResponse: InstagramResponse = {
    "data": instagramList,
    "code": 0,
    "msg" : "success"
  }
  // res.status(200).json(instagramResponse)

  return NextResponse.json(instagramResponse)
}