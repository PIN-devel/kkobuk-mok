import styled from "styled-components";

const Wrapper = styled.div`
$c-one: #eba8b0;
$c-two: #73bfff;
$c-three: #8dd6cd;

h1{
  color:#f0f0f0;
  font-size:28px;
  font-weight:300;
  font-family:sans-serif;
  margin-bottom:60px;
}

.outerF{
  display:flex;
  position:relative;
  flex-direction:column;
  width:600px;
  background:white;
  height:calc(40vh + 48px);
  box-shadow:0 5px 8px -4px rgba(0,0,0,0.4);
  
  @media (max-width: 599px){
    width:90%;
  }
  
  .nav{
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    counter-reset: counter;
    
    a{
      position:relative;
      padding:15px;
      width:calc(100%/3);
      text-align:center;
      font-family:sans-serif;
      font-weight:bold;
      transition:all .3s ease-out;
      cursor:pointer;
      overflow:hidden;
      
      &:after{
        position:absolute;
        bottom:-100%;
        left:50%;
        display:block;
        content:"";
        width:0;
        height:0;
        border:10px solid transparent;
        transform:translateX(-50%);
        border-bottom-color:$c-one;
        transition:all .4s ease-out;
      }
      
      &.active{
        &:after{
         bottom:0;
        }
      }
      
      &:hover{
        color:$c-one;
        background: rgba($c-one, 0.4);
      }
      &:nth-child(2){
        &:hover{
          color:$c-two;
          background:rgba($c-two, 0.4);
        }
        &:after{
          border-bottom-color:$c-two;
        }
      }
      &:nth-child(3){
        &:hover{
          color:$c-three;
          background:rgba($c-three, 0.4);
        }
        &:after{
          border-bottom-color:$c-three;
        }
      }
      
    }
  }
  
  .item{
    display:flex;
    position:absolute;
    width:100%;
    justify-content:center;
    align-items:center;
    height:40vh;
    
    h2{
      color:white;
    }
    
    &.fade{
      &-enter{
        opacity:0.1;
      }
      &-enter-active{
        opacity:1;
        transition:all .3s;
      }
      &-leave{
        opacity:1;
      }
      &-leave-active{
        opacity:0.1;
        transition:all .3s;
      }
    }
  }
}
`;

export default Wrapper;
