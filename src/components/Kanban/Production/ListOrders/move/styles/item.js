import React from 'react';
import styled from '@xstyled/styled-components';
import tagColors from "../../../../../../constants/colorsKanbanTagOrderList";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import colors from "../../../../../../constants/colors";
import gifImage from "../../../../../../asset/images/2acfa2de9ac1fcc35985c6cbcc66ec23.gif";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useTranslation} from "react-i18next";

const Container = styled.a`
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px #A5ADBA` : 'none')};
  user-select: none;
  color: #091e42;
  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }
  &:focus {
    outline: none;
    border-color: #202124;
    box-shadow: none;
  }
  display: flex;
`;

function getStyle(provided, style) {
    if (!style) {
        return provided.draggableProps.style;
    }

    return {
        ...provided.draggableProps.style,
        ...style,
    };
}

const Button = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

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

const GifContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const GifImage = styled.img`
  width: 27px;
  height: 23px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin-top: 0px;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
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

function QuoteItem(props) {
    const { t } = useTranslation();
    const { quote, isDragging, isGroupedOver, provided, style, isClone, index,status, color,isFirstColumn,handleDetailOrder } = props;

    const handleOpenProductionMethodModal = (orderId) => {
        handleDetailOrder(orderId)
    };
    return (
        <Container
            isDragging={isDragging}
            isGroupedOver={isGroupedOver}
            isClone={isClone}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle(provided, style)}
            data-is-dragging={isDragging}
            data-testid={quote.id}
            data-index={index}
        >
            <Content>
                <Footer>
                    <Code>{quote.code}</Code>
                    {isFirstColumn && quote.warning && (
                        <GifContainer>
                            <LightTooltip title={quote.warning} TransitionProps= {{ timeout: 0 }}>
                                <GifImage src={gifImage} alt="gif" />
                            </LightTooltip>
                        </GifContainer>
                    )}
                    {isFirstColumn && (
                        <QuoteId>
                            <Button>
                                <AddBoxIcon onClick={() => handleOpenProductionMethodModal(quote.id)} sx={{ color: colors.oceanblueColor }} />
                            </Button>
                        </QuoteId>
                    )}
                </Footer>
                <Footer>
                    <Status background={color}>
                        <Author>{t(status)}</Author>
                    </Status>
                    {quote.tags &&
                        quote.tags.map((tag) => (
                            <Tag key={tag.id} tag={tag.tag_name}>{tag.tag_name}</Tag>
                        ))}
                </Footer>
            </Content>
        </Container>
    );
}

export default React.memo(QuoteItem);
