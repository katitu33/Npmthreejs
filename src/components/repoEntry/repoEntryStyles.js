import React from 'react';
import styled from 'styled-components';

const RepoEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Courier New";
  color: #39ff14;
  
  .input {
      display: flex;
      justify-content: center;
      align-items: center;
      
      input {
        height: 40px;
        width: 300px;
        background: transparent;
        border: none;
        font-size: 18px;
        color: gray;
        text-overflow: ellipsis;
      }
      
      input:focus {
        outline: none;
      }
      
      button {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        background: #242b2d;
        color: #39ff15;
        border-color: #39ff15;
        font-weight: bold;
        margin-left: 20px;
      }
  }
`;

export {
    RepoEntryContainer
}
