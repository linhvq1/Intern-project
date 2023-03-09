import { inject, observer } from "mobx-react";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Navbar from "../components/layouts/Navbar";
import AddScheduleInfo from "./AddScheduleInfo/AddScheduleInfo";
import TripDetail from "./AddScheduleInfo/TripDetail";
import ScheduleList from "./ScheduleList/ScheduleList";

function Home({ commonStore, scheduleStore }) {
  return (
    <div className="bg-gray-50 h-screen transition-height duration-75 ease-out">
      <Navbar className="h-screen flex-initial" />
      <div className="pb-2 flex-1 h-screen overflow-y-auto">
        <Routes>
          <Route path="/" element={<ScheduleList />} />
          <Route path="add-schedule/:id" element={<AddScheduleInfo />} />
          <Route path="add-schedule/" element={<AddScheduleInfo />} />
          <Route path="detail-schedule/:parentId" element={<TripDetail />} />
          <Route
            path="*"
            element={
              <p className="h-full flex justify-center items-center">
                Path not resolved
              </p>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default inject("scheduleStore", "commonStore")(observer(Home));
