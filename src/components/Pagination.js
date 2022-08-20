import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import StyledBtn from "../styles/StyledBtn";
import Color from "../styles/Color";

const Pagination = ({pages, setPages, totalPageCount, pageNo, setPageNo}) => {

  const [showGoLeftPages, setShowGoLeftPages] = useState(false);
  const [showGoRightPages, setShowGoRightPages] = useState(true);


  useEffect(() => {
    if(totalPageCount <= 5) setShowGoRightPages(false);
    if(totalPageCount >= 5) setPages([1,2,3,4,5]);
    else {
      let list = [];
      for(let i=1; i<=totalPageCount; i++)
        list.push(i);
      setPages(list);
    }
  },[]);

  // 페이지 클릭
  const onClickPage = (e) => {
    console.log("페이지 클릭: ", e.target.innerHTML);
    setPageNo(parseInt(e.target.innerHTML));
  };

  // 페이지 넘기기
  const onClickNextPages = () => {
    // console.log("페이지 넘기기");
    // console.log("페이지:" + pages);
    let list = [];
    for(let i=0; i<5; i++){
      list[i] = pages[i]+5;
      if(list[i] >= totalPageCount) {
        setShowGoRightPages(false);
        break;
      }
    }
    setPages(list);
    setShowGoLeftPages(true);
  };

  //페이지 돌아가기
  const onClickPreviousPages = () => {
    // console.log("페이지 돌아가기");
    // console.log("페이지: " + pages);
    if(pages.length < 5){
      for(let i=0; i<5; i++) pages[i] = pages[0]+i;
    }
    let list = [];
    for(let i=4; i>=0; i--){
      list[i] = pages[i]-5;
      if(list[i] <= 1) {
        setShowGoLeftPages(false);
        break;
      }
    }
    setPages(list);
    setShowGoRightPages(true);
  };

  // 페이지 번호
  const showPages = pages.map((page) => {
    // console.log("page: ", page, " pageNo: ", pageNo)
    return (
        <PageNum onClick={onClickPage} check={page === pageNo}>
          {page}
        </PageNum>

    )
  });

  if(totalPageCount === 0) return

  return (
      <PaginationWrapper>
        {showGoLeftPages &&
            <MoveBtn onClick={onClickPreviousPages}>
              〈
            </MoveBtn>
        }
        <Pages>{showPages}</Pages>
        {showGoRightPages &&
            <MoveBtn onClick={onClickNextPages}>
              〉
            </MoveBtn>
        }
      </PaginationWrapper>
  )
}

export default Pagination;

/*페이지네이션*/
const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const Pages = styled.div`
  display: flex;
  flex-direction: row;
`

const PageNum = styled(StyledBtn)`
  font-size: 20px;
  padding: 10px;
  color: ${props => props.check ? Color.pointcolor : "none"};
  border-radius: 50%;
`

const MoveBtn = styled(StyledBtn)`
  padding: 5px;
`