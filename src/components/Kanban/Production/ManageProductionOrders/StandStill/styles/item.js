import * as React from 'react';
import styled, { keyframes } from '@xstyled/styled-components';
import { useTranslation } from 'react-i18next';
import AddBoxIcon from '@mui/icons-material/AddBox';
import tagColors from '../../../../../../constants/colorsKanbanTagOrderList';
import gifImage from '../../../../../../asset/images/2acfa2de9ac1fcc35985c6cbcc66ec23.gif'
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import colors from "../../../../../../constants/colors";
import {useState} from "react";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const Container = styled.a``;

const Content = styled.div`
  height: 70px;
  flex-grow: 1;
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8px;
  border-radius: 3px;
  margin-bottom: 5px;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const GifContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GifImage = styled.img`
  width: 27px;
  height: 23px;
`;

const Code = styled.small`
  font-size: 12px;
  margin: 1px;
  flex-grow: 1;
  font-weight: 400;
  padding: 4px;
`;

const Author = styled.small`
  font-size: 12px;
  flex-grow: 1;
  margin: 1px;
  border-radius: 2px;
  font-weight: normal;
  padding: 4px;
`;

const Tag = styled.small`
  font-size: 12px;
  margin: 1px;
  font-weight: normal;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 3px;
  width: fit-content;
  color: white;
  background-color: ${({ tag }) => tagColors[tag] || 'inherit'};
`;

const Material = styled.small`
  font-size: 12px;
  margin: 1px;
  font-weight: normal;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 50px;
  width: fit-content;
  color: white;
  background-color: ${({ tag }) => tagColors[tag] || 'inherit'};
`;

const Status = styled.div`
  margin: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 3px;
  background-color: ${({ background }) => background};
  width: fit-content;
  color: white;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

const LightTooltip = styled( ({ className, ...props }) => (
    <Tooltip {...props} classes= {{ popper: className }}/>
) )( ({ theme }) => ({
    [ `& .${ tooltipClasses.tooltip }` ]: {
        backgroundColor: colors.lilywhiteColor,
        color: colors.redColor,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        fontSize: 14,
        fontWeight: 700,
        borderRadius: 5,
        maxWidth: 'none',
        whiteSpace: 'nowrap',
    },
}) );

const CircleTooltip = styled( ({ className, ...props }) => (
    <Tooltip {...props} classes= {{ popper: className }}/>
) )( ({ theme }) => ({
    [ `& .${ tooltipClasses.tooltip }` ]: {
        backgroundColor: colors.lilywhiteColor,
        color: colors.oceanblueColor,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        fontSize: 14,
        fontWeight: 700,
        borderRadius: 5,
        maxWidth: 'none',
        whiteSpace: 'nowrap',
    },
}) );

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
`;

const AnimatedChangeCircleIcon = styled(ChangeCircleIcon)`
  animation: ${spinAnimation} 3s linear infinite;
`;

function QuoteItem(props) {
    const { t } = useTranslation();
    const { quote, status, color,isFirstColumn,isSecondColumn,isFourColumn,isFifthColumn } = props;

    return (
        <Container>
            {!isFourColumn && !isFifthColumn &&(
                <Content>
                    <Footer>
                        <Code>{quote.code}</Code>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {isFirstColumn && quote.warning && (
                                <LightTooltip title={quote.warning} TransitionProps={{ timeout: 0 }}>
                                    <GifImage src={gifImage} alt="gif" />
                                </LightTooltip>
                            )}
                            {isFirstColumn && quote.requested_change && (
                                <CircleTooltip title={quote.requested_change} TransitionProps={{ timeout: 0 }} >
                                    <AnimatedChangeCircleIcon sx={{ width: 33, height: 33, color: colors.oceanblueColor }} />
                                </CircleTooltip>
                            )}
                            {isFirstColumn && !quote.requested_change && (
                                <div style={{ marginRight:33 }}>
                                </div>
                            )}
                        </div>
                    </Footer>
                    <Footer>
                        <Status background={color}>
                            <Author>{t(status)}</Author>
                        </Status>
                        {quote.tags &&
                            quote.tags.map((tag) => (
                                <Tag key={tag.id} tag={tag.tag_name}>{tag.tag_name}</Tag>
                            ))}
                        {isSecondColumn && (
                            <Status background={colors.oceanblueColor}>
                                <Author>{quote.warning}</Author>
                            </Status>
                        )}
                    </Footer>
                </Content>
            )}
            {(isFourColumn || isFifthColumn) && (
                <Content>
                    <Footer>
                        <Code>{quote.code}</Code>
                    </Footer>
                    <Footer>
                        <Status background={color}>
                            <Author>{t(quote.status)}</Author>
                        </Status>
                    </Footer>
                </Content>
            )}
        </Container>
    );
}

export default React.memo(QuoteItem);
