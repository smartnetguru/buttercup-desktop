import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Flex } from 'styled-flexbox';
import Archive from '../components/archive';
import Sidebar from '../containers/sidebar';
import '../styles/workspace.global.scss';
import SavingModal from './saving-modal';
import { NoArchiveSelected, WelcomeScreen } from './empty-view';
import spinner from '../styles/img/spinner.svg';

const Primary = styled(Flex)`
  position: relative;
`;

const Workspace = ({
  currentArchive,
  archivesCount,
  setColumnSize,
  columnSizes,
  condencedSidebar,
  archivesLoading
}) => {
  return (
    <Flex flexAuto>
      <If condition={archivesCount > 0}>
        <Sidebar condenced={condencedSidebar} />
      </If>
      <Primary flexAuto>
        <Choose>
          <When condition={archivesLoading}>
            <Flex align="center" justify="center" flexColumn flexAuto>
              <img width="64" src={spinner} alt="Loading" />
            </Flex>
          </When>
          <Otherwise>
            <Choose>
              <When condition={archivesCount === 0}>
                <WelcomeScreen />
              </When>
              <When condition={archivesCount > 0 && currentArchive === null}>
                <NoArchiveSelected />
              </When>
              <Otherwise>
                <Archive
                  columnSizes={columnSizes}
                  onColumnSizeChange={setColumnSize}
                />
              </Otherwise>
            </Choose>
          </Otherwise>
        </Choose>
      </Primary>
      <SavingModal />
    </Flex>
  );
};

Workspace.propTypes = {
  currentArchive: PropTypes.object,
  archivesCount: PropTypes.number,
  columnSizes: PropTypes.object,
  condencedSidebar: PropTypes.bool,
  archivesLoading: PropTypes.bool,
  setColumnSize: PropTypes.func
};

export default Workspace;
