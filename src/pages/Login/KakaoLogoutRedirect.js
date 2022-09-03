import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const KakaoLogoutRedirect = () => {
  console.log("KakaoLogoutRedirect");

  const navigate = useNavigate();

  useEffect(() => {
    alert('로그아웃 되었습니다.');
    navigate("/");
  },[]);
}

export default KakaoLogoutRedirect;