import React from 'react';
import styled from 'styled-components';

import NoVulns from './noVulns.jpg'

const StyledImage = styled.img`
  margin: 10px;
  width: 200px;
`;

const NoVulnsMessage = () => {
    return (
        <StyledImage
            src={NoVulns}
            alt="No vulns found"
        />
    );
};

NoVulnsMessage.propTypes = {};

export default NoVulnsMessage;

