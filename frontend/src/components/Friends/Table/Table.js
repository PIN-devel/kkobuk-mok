import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../../../contexts/AuthContext";
import Cookies from "js-cookie";
// core components
import styles from "./tableStyle.js";
import Axios from "axios";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const { SERVER_URL } = useContext(AuthContext);
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    setTableData,
    dataType,
  } = props; // 1은 친구목록 2는 친구찾기 3은 보낸요청목록

  const token = Cookies.get("token");
  const config = {
    headers: {
      Authorization: `Jwt ${token}`,
    },
  };
  const addFriend = (id) => {
    Axios.post(`${SERVER_URL}/accounts/friend/${id}/`, null, config)
      .then((res) => {
        console.log(res.data);
        console.log("요청 성공");
        alert("친구요청이 완료되었습니다");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("요청 실패");
      });
  };

  const deleteFriend = (id) => {
    Axios.delete(`${SERVER_URL}/accounts/friend/${id}/`, null, config)
      .then((res) => {
        console.log(res.data);
        console.log("요청 성공");
      })
      .catch((err) => {
        console.log(err.response);
        console.log("요청 실패");
      });
  };

  const cancelRequest = (id) => {
    Axios.post(`${SERVER_URL}/accounts/friend/${id}/`, null, config) // 여기 나중에 수정해야함
      .then((res) => {
        console.log(res.data);
        console.log("친구 요청 취소 성공");
        alert("친구 요청이 취소되었습니다");
        // 수미가 url 만들면 보낸 요청리스트 다시 불러와서 axios로 받아와서 setTableData돌려야함
      })
      .catch((err) => {
        console.log(err.response);
        console.log("친구 요청 취소 실패");
      });
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.slice(1).map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
                {dataType === 1 ? (
                  <TableCell className={classes.tableCell} key={key}>
                    <Button
                      color="primary"
                      onClick={() => {
                        deleteFriend(prop[0]);
                      }}
                    >
                      친구 삭제
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
                {dataType === 2 ? (
                  <TableCell className={classes.tableCell} key={key}>
                    <Button
                      color="primary"
                      onClick={() => {
                        addFriend(prop[0]);
                      }}
                    >
                      친구 요청
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
                {dataType === 3 ? (
                  <TableCell className={classes.tableCell} key={key}>
                    <Button
                      color="primary"
                      onClick={() => {
                        cancelRequest(prop[0]);
                      }}
                    >
                      취소
                    </Button>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
