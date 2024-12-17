import React from "react";
import styled from "@xstyled/styled-components";
import { colors } from "@atlaskit/theme";
import { Draggable } from "react-beautiful-dnd";
import QuoteList from "../styles/list";
import Title from "../styles/title";
import {useTranslation} from "react-i18next";

const Container = styled.div`
  margin: 25px 15px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 3px;
  background-color: ${({ background }) => background};
  width: fit-content;
  color: white;
  margin-bottom: 10px;
`;

const Column = (props) => {
    const { t } = useTranslation();
    const { title, quotes, color, status, isFirstColumn,index, handleDetailOrder} = props;
    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}>
                    <Header  background={color}>
                        <Title>
                            {t(title)}
                        </Title>
                    </Header>
                    <QuoteList
                        listId={title}
                        listType="QUOTE"
                        style={{
                            backgroundColor: snapshot.isDragging ? colors.G50 : null
                        }}
                        quotes={quotes}
                        internalScroll={props.isScrollable}
                        isCombineEnabled={Boolean(props.isCombineEnabled)}
                        useClone={Boolean(props.useClone)}
                        status={status}
                        color={color}
                        isFirstColumn={isFirstColumn}
                        handleDetailOrder={handleDetailOrder}
                    />
                </Container>
            )}
        </Draggable>
    );
};

export default Column;
