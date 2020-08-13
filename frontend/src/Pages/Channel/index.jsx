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

const Channel = () => {
  // console.log("채널컴포 렌더링");
  // 입장 채널
  const { channelIn, setChannelIn, SERVER_URL } = useContext(AuthContext);
  //검색 키워드
  const [searchData, setSearchData] = useState("");
  // 채널 리스트
  const [channels, setChannels] = useState([]);
  // 채널 페이지
  const [page, setPage] = useState(1);

  // 검색 채널 리스트 (channels) 가져오기
  const token = Cookies.get("token");
  const config = {
    params: {
      _page: page,
      keyword: searchData,
    },
    headers: {
      Authorization: `jwt ${token}`,
    },
  };
  const getChannels = (searchData) => {
    // searchData 써서 채널 이름 저거 들어가는거 가지고와
    // 이거 모델에 만들어야함
    const handleSetChannels = (getChannels) => {
      setChannels(getChannels);
    };
    axios
      .get(SERVER_URL + "/rooms", config)
      .then((res) => {
        console.log("채널들 가져옴");
        // console.log(res);
        handleSetChannels(res.data.data);
      })
      .catch((err) => {
        console.log("Channel 에러!!");
        console.log(err.response);
      });
  };
  useEffect(() => getChannels(searchData), [searchData, page]);
  //

  // 채널 출입 다시 렌더링 해줘야할 듯
  useEffect(() => {
    getChannels(); // 이거 다시...
    console.log("출입 중");
  }, [channelIn]);

  return (
    <Layout>
      {/* <SearchContext.Provider value={{ searchData, setSearchData }}> */}
      {!channelIn ? (
        <div>
          <SearchComponent
            searchData={searchData}
            setSearchData={setSearchData}
          />
          <ChannelList channels={channels} page={page} setPage={setPage} />
        </div>
      ) : (
        <ChannelDetail channel={channelIn} />
      )}
      {/* </SearchContext.Provider> */}
    </Layout>
  );
};

export default Channel;
