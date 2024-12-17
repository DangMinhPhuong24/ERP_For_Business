/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from '@xstyled/styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import QuoteItem from './item';
import Title from './title';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 220px;
  overflow-y: auto;
`;

const scrollContainerHeight = 500;

const DropZone = styled.div`
  min-height: ${scrollContainerHeight}px;
  padding-bottom: 8px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

const Container = styled.div``;


const InnerQuoteList = React.memo(function InnerQuoteList(props) {
    const { color, status, isFirstColumn, handleDetailOrder} = props;
    return props.quotes.map((quote, index) => (
        <Draggable key={quote.id} draggableId={String(quote.id)} index={index}>
        {(dragProvided, dragSnapshot) => (
                <QuoteItem
                    key={quote.id}
                    quote={quote}
                    isDragging={dragSnapshot.isDragging}
                    isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
                    provided={dragProvided}
                    status={status}
                    color={color}
                    isFirstColumn={isFirstColumn}
                    handleDetailOrder={handleDetailOrder}
                />
            )}
        </Draggable>
    ));
});

function InnerList(props) {
    const { quotes, dropProvided,status, color ,isFirstColumn,handleDetailOrder } = props;
    const title = props.title ? <Title>{props.title}</Title> : null;
    return (
        <Container>
            {title}
            <DropZone ref={dropProvided.innerRef}>
                <InnerQuoteList quotes={quotes} status={status} color={color} isFirstColumn={isFirstColumn} handleDetailOrder={handleDetailOrder}/>
                {dropProvided.placeholder}
            </DropZone>
        </Container>
    );
}

export default function QuoteList(props) {
    const {
        ignoreContainerClipping,
        internalScroll,
        scrollContainerStyle,
        isDropDisabled,
        isCombineEnabled,
        listId = 'LIST',
        listType,
        style,
        quotes,
        title,
        useClone,
        status,color ,isFirstColumn,handleDetailOrder
    } = props;

    return (
        <Droppable
            droppableId={listId}
            type={listType}
            ignoreContainerClipping={ignoreContainerClipping}
            isDropDisabled={isDropDisabled}
            isCombineEnabled={isCombineEnabled}
            renderClone={
                useClone
                    ? (provided, snapshot, descriptor) => (
                        <QuoteItem
                            quote={quotes[descriptor.source.index]}
                            provided={provided}
                            isDragging={snapshot.isDragging}
                            isClone
                            status={status}
                            color={color}
                            isFirstColumn={isFirstColumn}
                            handleDetailOrder={handleDetailOrder}
                        />
                    )
                    : null
            }
        >
            {(dropProvided, dropSnapshot) => (
                <Wrapper
                    style={style}
                    isDraggingOver={dropSnapshot.isDraggingOver}
                    isDropDisabled={isDropDisabled}
                    isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                    {...dropProvided.droppableProps}
                >
                    {internalScroll ? (
                        <ScrollContainer style={scrollContainerStyle}>
                            <InnerList quotes={quotes} title={title} dropProvided={dropProvided} status={status} color={color} isFirstColumn={isFirstColumn} handleDetailOrder={handleDetailOrder}/>
                        </ScrollContainer>
                    ) : (
                        <InnerList quotes={quotes} title={title} dropProvided={dropProvided} status={status} color={color} isFirstColumn={isFirstColumn} handleDetailOrder={handleDetailOrder}/>
                    )}
                </Wrapper>
            )}
        </Droppable>
    );
}
