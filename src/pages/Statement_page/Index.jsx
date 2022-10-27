import React from "react";
import Navbar from "../Calender_page/Navbar_new";
import Sidebar from "../Calender_page/Sidebar_new";
import ActionAreaCard from "./Card.tsx";

function Index() {
  return (
    <div className="body__content">
      <Sidebar />
      <div className="right__hand">
        <Navbar page_name="Statement" />
        <div className="body__content">
          <ActionAreaCard />
          <ActionAreaCard />
          <ActionAreaCard />
        </div>
      </div>
    </div>
  );
}

export default Index;