import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

export default function GoToTop() {
  const [isVisible, setIsVisible] =useState(false);

  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const listenToScroll = () =>{

    let heightToHidden = 300;
    const winScroll = 
      document.body.scrollTop || document.documentElement.scrollTop;
      if(winScroll > heightToHidden){
        setIsVisible(true);
      }else{
        setIsVisible(false);
      }
  };

  useEffect(() => {
    window.addEventListener('scroll', listenToScroll);
  }, []);


  return (
         <Wrapper>
    

      {isVisible && (
      <div className="top-btn" onClick={goToBtn}>
        <MdKeyboardDoubleArrowUp className="top-btn--icon" />
      </div>
      )}
      
    </Wrapper>
   
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  .top-btn {
    font-size: 2.5rem;
    width: 3.5rem;
    height: 3.5rem;
    color: #333;
    background-color: white;
    border: 2px solid rgba(0,0,0,0.1);
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    border-radius: 50%;
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &--icon {
      animation: gototop 1.2s linear infinite alternate-reverse;
    }

    @keyframes gototop {
      0% {
        transform: translateY(-0.4rem);
      }
      100% {
        transform: translateY(0.5rem);
      }
    }
  }
`;
