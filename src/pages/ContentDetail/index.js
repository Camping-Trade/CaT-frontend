import React from "react";
import {useParams, useLocation} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ContentDetail = () => {
  const params = useParams();
  const location = useLocation();

  console.log(params, location)

  return (
      <div>
        <Header />

        <Footer />
      </div>
  )
}

export default ContentDetail;