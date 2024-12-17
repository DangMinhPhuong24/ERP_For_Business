import React from 'react';
import colors from '../../constants/colors';
import ReactLoading from "react-loading";
import { useSelector } from 'react-redux';
import {appLoadingStatus} from "../../redux/app/app.selectors";
import '../../resource/style/loadingStyle.css';


function ShowLoading() {
  const isShowLoading = useSelector(appLoadingStatus);
  if (isShowLoading) {
    return(
      <div className="loading-wrapper">
        <ReactLoading type={"spinningBubbles"} color={colors.blueColor} height={"5%"} width={"5%"} />
      </div>
      )
  } else {
    return null
  }
}
export default ShowLoading;
