import React from "react";
import { Drawer } from "antd";
import { CLOSE_DRAWER } from "../../redux/constants/DrawerConstants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function DrawerHOC(props) {
  const dispatch = useDispatch();
  const { title, isDrawerOpen, Component } = useSelector(
    (state) => state.DrawerReducer
  );
  const closeDrawer = () => {
    dispatch({ type: CLOSE_DRAWER });
  };
  return (
    <>
      <Drawer
        title={title}
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={720}
        keyboard={true}
        maskClosable={true}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        {Component}
      </Drawer>
    </>
  );
}
