import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const StyledIcon = styled(Avatar)`
  width: 82px;
  height: 82px;
`;

const UserName = styled(Typography)`
  margin-left: 16px;
  font-weight: 500;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

export const UserAvatar = ({ userName, iconImageUrl }) => {
  return (
    <>
      <Wrapper>
        <StyledIcon alt={userName} src={iconImageUrl} />
        <UserName>{userName}</UserName>
      </Wrapper>
    </>
  );
};
