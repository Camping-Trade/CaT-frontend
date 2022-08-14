import React from "react";
import {useParams} from "react-router-dom";

const ContentDetail = () => {
  const params = useParams();

  return (
      <div>
        {`캠핑장 ${params.id}의 상세 페이지`}
      </div>
  )
}

export default ContentDetail;