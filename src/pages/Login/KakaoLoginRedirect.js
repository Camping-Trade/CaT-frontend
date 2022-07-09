
import React, {useEffect} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const KakaoLoginRedirect = () => {
  const navigate = useNavigate();
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    (async () => {
      await axios
          .get(`http://localhost:8080/oauth/kakao=${code}`)
          .then((res) => {
            console.log(res.data);
            // const ACCESS_TOKEN = res.data.searchParams.get("access_token");
            // localStorage.setItem("authorization", ACCESS_TOKEN);
            // alert("환영합니다!");
            // navigate("/");
          })
          .catch((err) => {
            console.log(err);
            alert("로그인 실패");
          })
    })();
  },[]);

}

export default KakaoLoginRedirect;
