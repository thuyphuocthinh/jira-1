import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  const isLoading = useSelector((state) => state.LoadingReducer.isLoading);
  return (
    <>
      {isLoading ? (
        <div className="loadingGif">
          <img
            src={require("../../assets/loadingImage/loading.gif")}
            alt="Loading gif"
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
