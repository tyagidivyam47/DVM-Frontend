import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayCard from "../../Components/DisplayCard";

const Home = () => {
  const API_ENDPOINT = import.meta.env.VITE_BASE_URL;

  const [inactiveData, setInactiveData] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  const getAllElections = async () => {
    const resp = await axios.get(`${API_ENDPOINT}getElections`);
    const data = resp.data.data;
    let inactiveTemp = [];
    let activeTemp = [];
    let completedTemp = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].status === "INACTIVE") {
        inactiveTemp.push(data[i]);
      } else if (data[i].status === "ACTIVE") {
        activeTemp.push(data[i]);
      } else {
        completedTemp.push(data[i]);
      }
    }
    setActiveData(activeTemp);
    setInactiveData(inactiveTemp);
    setCompletedData(completedTemp);
    // console.log(data);
  };

  useEffect(() => {
    getAllElections();
  }, []);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
        <div
          style={{
            border: " 2px solid black",
            height: "60vh",
            overflowY: "auto",
          }}
        >
          <div className="flex justify-center font-semibold text-xl mb-4">INACTIVE</div>
          <div>
            {inactiveData &&
              inactiveData.map((e) => (
                <div>
                  <DisplayCard
                    color={"#e8f48c"}
                    createdBy={e.createdBy.firstName}
                    post={e.post}
                    session={e.term}
                    timeLimit={e.timeLimit}
                    key={e._id}
                  />
                </div>
              ))}
          </div>
        </div>
        <div style={{ border: " 2px solid black", height: "60vh" }}>
        <div className="flex justify-center font-semibold text-xl mb-4">ACTIVE</div>
          <div>
            {activeData &&
              activeData.map((e) => (
                <div>
                  <DisplayCard
                    color={"#32cd32"}
                    createdBy={e.createdBy.firstName}
                    post={e.post}
                    session={e.term}
                    timeLimit={e.timeLimit}
                    key={e._id}
                  />
                </div>
              ))}
          </div>
        </div>
        <div style={{ border: " 2px solid black", height: "60vh" }}>
        <div className="flex justify-center font-semibold text-xl mb-4">COMPLETED</div>
          <div>
            {completedData &&
              completedData.map((e) => (
                <div className="mb-4">
                  <DisplayCard
                    color={"#87cefa"}
                    createdBy={e.createdBy.firstName}
                    post={e.post}
                    session={e.term}
                    timeLimit={e.timeLimit}
                    key={e._id}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
