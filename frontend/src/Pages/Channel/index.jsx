import React, { useState, useContext, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../contexts/AuthContext";
import ChannelList from "../../components/Channel/ChannelList";
import ChannelDetail from "../../components/Channel/ChannelDetail";
import SearchComponent from "../../components/Search";
// import { SearchContext } from "../../contexts/SearchContext";

import Layout from "../../Layout/MyDash/Dashboard";

import axios from "axios";
import Cookies from "js-cookie";

const mockData = [
  {
    id: 1,
    title: "3기_2반 채널",
    description: "전국제패 가자",
    imageUrl: "/images/tech-neck.jpg",
    members: "594",
    updatedAt: "27/03/2019",
  },
  {
    id: 2,
    title: "Medium Corporation",
    description:
      "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.",
    imageUrl: "/images/tech-neck.jpg",
    members: "625",
    createdAt: "31/03/2019",
  },
  {
    id: 3,
    title: "Slack",
    description:
      "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.",
    imageUrl: "/images/tech-neck.jpg",
    members: "857",
    createdAt: "03/04/2019",
  },
  {
    id: 4,
    title: "Lyft",
    description:
      "Lyft is an on-demand transportation company based in San Francisco, California.",
    imageUrl: "/images/tech-neck.jpg",
    members: "406",
    createdAt: "04/04/2019",
  },
  {
    id: 5,
    title: "GitHub",
    description:
      "GitHub is a web-based hosting service for version control of code using Git.",
    imageUrl: "/images/tech-neck.jpg",
    members: "835",
    createdAt: "04/04/2019",
  },
  {
    id: 6,
    title: "Squarespace",
    description:
      "Squarespace provides software as a service for website building and hosting. Headquartered in NYC.",
    imageUrl: "/images/tech-neck.jpg",
    members: "835",
    createdAt: "04/04/2019",
  },
];

const Channel = () => {
  console.log("채널컴포 렌더링");
  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);
  const [searchData, setSearchData] = useState(""); //여기 처음에 axios 보내서 전체 값 보여줘야함
  const [channels, setChannels] = useState([]); //이거 지금은 이건데 나중에는 []로 해야해

  // channels axios 가져오기
  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const getChannels = (searchData) => {
    // searchData 써서 채널 이름 저거 들어가는거 가지고와
    // 이거 모델에 만들어야함
    const handleChannels = (getChannels) => {
      setChannels(getChannels);
    };
    axios
      .get(SERVER_URL + "/rooms", config)
      .then((res) => {
        console.log("성공");
        console.log(res);
        handleChannels(res.data.data);
        // setChannels(); // 여기 channels 업데이트 해줘
      })
      .catch((err) => {
        console.log("에러!!");
        console.log(err.response);
      });
  };
  // useEffect(() => console.log("왔다"), [searchData]);
  useEffect(() => getChannels(searchData), [searchData]);

  return (
    <Layout>
      {/* <SearchContext.Provider value={{ searchData, setSearchData }}> */}
      {!channelIn ? (
        <div>
          <SearchComponent
            searchData={searchData}
            setSearchData={setSearchData}
          />
          <ChannelList channels={channels} />
        </div>
      ) : (
        <ChannelDetail channel={channelIn} />
      )}
      {/* </SearchContext.Provider> */}
    </Layout>
  );
};

export default Channel;
