import React, { useRef, useState } from 'react';
import { styled } from '@linaria/react';
import Utils from '@app/library/base/utils.js';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import { selectAppParams, selectIsModerator, selectPopupsState } from '@app/containers/Main/store/selectors';
import { Container, Heading } from 'theme-ui';

interface WindowProps {
  onPrevious?: React.MouseEventHandler | undefined;
}

/* const Container = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => Utils.isWeb() ? bgColor : 'transparent'};
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
 */

const Window: React.FC<WindowProps> = ({
  children
}) => {
  const navigate = useNavigate();
  const rootRef = useRef();

  /* const appParams = useSelector(selectAppParams());
  const isModerator = useSelector(selectIsModerator()); */

  const titleClicked = () => {
    navigate("/");
  };

  return (
    <>
      {/* <Container bgColor={Utils.getStyles().background_main} ref={rootRef}> */}
      <Container variant="window" sx={(theme) => ({background: Utils.isWeb() ?  'layout.window.background' : 'transparent'})}>
          {/* {appParams.is_admin || isModerator ? null : null} */}
        {children}
      </Container>
    </>
  );
};

export default Window;
