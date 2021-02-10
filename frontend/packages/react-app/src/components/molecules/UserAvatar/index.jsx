import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

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
        {iconImageUrl === "" ? (
          <Skeleton
            variant="circle"
            width={82}
            height={82}
            style={{ marginRight: 16 }}
          />
        ) : (
          <StyledIcon alt={userName} src={iconImageUrl} />
        )}
        {userName === "" ? (
          <Skeleton width={100} />
        ) : (
          <UserName>{userName}</UserName>
        )}
      </Wrapper>
    </>
  );
};
