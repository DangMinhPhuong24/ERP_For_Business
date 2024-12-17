import * as React from 'react';
import styled from '@xstyled/styled-components';
import { useTranslation } from 'react-i18next';
import AddBoxIcon from '@mui/icons-material/AddBox';
import tagColors from '../../../../../../constants/colorsKanbanTagOrderList';
import gifImage from '../../../../../../asset/images/2acfa2de9ac1fcc35985c6cbcc66ec23.gif'
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import colors from "../../../../../../constants/colors";
import {useState} from "react";

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

function QuoteItem(props) {
    const { t } = useTranslation();
    const { quote, status, color,isFirstColumn } = props;

    return (
        <Container>
            <Content>
                <Footer>
                    <Code>{quote.code}</Code>
                </Footer>
                <Footer>
                    <Status background={color}>
                        <Author>{t(status)}</Author>
                    </Status>
                    {quote.tags &&
                        quote.tags.map((tag) => (
                            <Tag key={tag.id} tag={tag.tag_name}>{tag.tag_name}</Tag>
                        ))}
                    {isFirstColumn && (
                        <Status background={colors.oceanblueColor}>
                            <Author>{quote.warning}</Author>
                        </Status>
                    )}
                </Footer>
            </Content>
        </Container>
    );
}

export default React.memo(QuoteItem);
