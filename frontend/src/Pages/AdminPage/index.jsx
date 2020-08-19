import React, {useState } from "react";
import Wrapper from "./styles";
import Layout from "../../Layout/MyDash/Dashboard";
import { CSSTransitionGroup } from 'react-transition-group'

const items = [
    {name: "제품키 조회", color:"#eba8b0"},
    {name: "유저 조회", color:"#73bfff"},
    {name: "제품키 추가", color:"#8dd6cd"},
  ]

const AdminPage = () => {
    const [selected, setSelected] = useState(0);
    
    const handleSelect = (e, key) => {
        e.preventDefault();
        setSelected(key);
    }

    const renderItems = () => {
        return items.map( (item, key)=>{
            if(key !== selected) return
            return (
              <div className="item"
                key={`items-${key}`}
                style={{backgroundColor:item.color}}>
                <h2>{item.name}</h2>
              </div>
            );
          })
      }

    return (
        <Layout>
        <Wrapper>
            <div className="outerF">
            <div className="nav">
            {items.map((item, key)=>{
              const activeClass = key === selected ? 'active' : '';
              return(
                <a className={`${activeClass} select`} 
                   key={item.color} 
                   onClick={(e) =>{handleSelect(e, key)}}>
                  <span>{item.name}</span>
                </a>
              )
            })}
          </div>
          <div className="items">
             <CSSTransitionGroup
               transitionName="fade"
               transitionEnterTimeout={300}
               transitionLeaveTimeout={300}>
               {renderItems()}
            </CSSTransitionGroup>
          </div>
            </div>
        </Wrapper>
        </Layout>
    );
}

export default AdminPage;