import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {Line, ModalWrapper} from "./style";
import StyledBtn from "../../styles/StyledBtn";

const HeaderModal = ({show}) => {

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['appToken']);

  const onLogout = () => {
    const logout = window.confirm("로그아웃 하시겠습니까?");
    if(!logout) return

    removeCookie('appToken', {path: '/'});
    window.location.reload();
    alert("로그아웃 되었습니다.");
    navigate("/");
  }

  if(!show) return
  return (
      <ModalWrapper>
        <StyledBtn>마이페이지</StyledBtn>
        <Line></Line>
        <StyledBtn onClick={onLogout}>로그아웃</StyledBtn>
      </ModalWrapper>
  )
}

export default HeaderModal;