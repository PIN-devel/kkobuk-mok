import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { Wrapper } from "./styles";

const Graphs = (props) => {
  const [dataBar, setDataBar] = useState({});
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          barPercentage: 10,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
            color: "rgba(0, 0, 0, 0.1)"
          },
          ticks: {
            beginAtZero: true,
                max: 3,
                min: 0,
                precision:0
          }
        }
      ]
    }
  }

  const changeScore = (n) => {
    if (n == 0) {
      return 0;
    } else {
      return 4 - n;
    }
  };

  useEffect(() => {
    const newData = []
    const newLabel = []
    props.data.map((data) => {
      newLabel.push(data.time);
      newData.push(changeScore(data.score))
    });
    const newbar = {
      labels: newLabel,
      datasets: [
        {
          label: "점수",
          data: newData,
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",

          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",

          ]
        }
      ]
    }
    setDataBar(newbar);
  }, [props.data]);

  return (
    <Wrapper>
      <MDBContainer className="BarContainer">
        <Bar data={dataBar} options={barChartOptions} />
      </MDBContainer>
    </Wrapper>
  )
};

export default Graphs;
