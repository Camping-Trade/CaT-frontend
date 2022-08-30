import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Header from "../../components/Header";
import TourPicsAPI from "../../components/API/TourPicsAPI";
import {BgImg, Btn, BtnWrapper, ImgSlideWrapper, PhoneImg, Title} from "./style";
import Phone from "../../assets/Phone.png";

const Main = () => {

  const navigate = useNavigate();

  const [urlList, setUrlList] = useState([]);

  // 관광사진 목록 불러오기
  useEffect(() => {
    TourPicsAPI()
        .then((res) => {
          console.log("관광사진 목록", res);

          let list = [];
          res.map((item) => {
            list.push(item.children[3].value);
          })
          setUrlList(list);
        })
        .catch((err) => {
          console.log(err);
        })
  },[]);

/*  // 이미지 슬라이드
  const ImgSlide = () => {
    for(let i=0; i<urlList.length; i++) {

    }

    setTimeout(ImgSlide, 3000);

  };*/

  return (
      <div>
        <Header />
        <ImgSlideWrapper>
          <BgImg bgImg={urlList[0]} />
          {/*<ul style={{margin: 0, padding: 0, width: "100%", height: "100%"}}>
            {urlList.map((url, index) => {
              return (
                  <li className="slider" style={{width: "100%", height: "100%"}}>
                    <BgImg bgImg={url} key={index} />
                  </li>
              )
            })}
          </ul>*/}
          <Title>Camping Trade</Title>
          <BtnWrapper>
            <Btn onClick={() => navigate('/campsites/all')}>
              🏕 Campsites 🏕
            </Btn>
          </BtnWrapper>
          <PhoneImg src={Phone} />
        </ImgSlideWrapper>

      </div>
  )
}

export default Main;