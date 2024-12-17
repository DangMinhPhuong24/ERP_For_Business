import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../redux/app/app.slice"

const PageWrapper = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props.state]);

  return (
      <>{props.children}</>
  );
};

export default PageWrapper;
