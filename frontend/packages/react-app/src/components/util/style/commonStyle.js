import styled from "styled-components";
import { theme } from "../style/theme";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";

export const StyledContainer = styled(Container)`
  padding-top: 54px;
  margin-bottom: 62px;
  ${theme.breakpoints.down(600)} {
    padding-top: 24px;
  }
`;

export const Frame = styled(Paper)`
  width: 100%;
  max-width: 416px;
  margin: 0 auto 16px;
  padding: 52px;
  box-sizing: border-box;
  ${theme.breakpoints.down(600)} {
    padding: 24px;
  }
`;
