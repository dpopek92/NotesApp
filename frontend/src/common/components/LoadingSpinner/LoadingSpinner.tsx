import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const Wrapper = styled.div`
  z-index: 1100;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;
const SpinnerWrapper = styled.div`
  z-index: 1101;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingSpinner = () => (
  <Wrapper>
    <SpinnerWrapper>
      <Spinner
        animation="grow"
        variant="primary"
        data-testid="spinner-test-id"
      />
    </SpinnerWrapper>
  </Wrapper>
);

export default LoadingSpinner;
