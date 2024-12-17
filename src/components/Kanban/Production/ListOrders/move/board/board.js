
import React, { useState } from 'react';
import styled from '@xstyled/styled-components';
import { colors } from '@atlaskit/theme';
import PropTypes from 'prop-types';
import Column from './column';
import reorder, { reorderQuoteMap } from '../reorder';
import { DragDropContext,  } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from "../../../../../../helpers/index";
import titleKanbanOneOrderList from "../../../../../../constants/titleKanbanOneOrderList";
import colorsKanbanOneOrderList from "../../../../../../constants/colorsKanbanOneOrderList";
import {statusKanbanOneOrderList} from "../../../../../../constants/titleKanbanOneOrderList";

const Container = styled.div`
  min-height: 50px;
  min-width: 50px;
  display: inline-flex;
`;

const BoardMove = ({
                   isCombineEnabled,
                   initial,
                   useClone,
                   containerHeight,
                   handleUpdateOrderWaitingManufactureToOrderWaitingCreated,
                   handleUpdateOrderWaitingCreatedToOrderWaitingManufacture,
                   withScrollableColumns,
                       handleDetailOrder
               }) => {
    const [columns, setColumns] = useState(initial);
    const [ordered, setOrdered] = useState(Object.keys(initial));
    const onDragEnd = (result) => {
        if (result.combine) {
            if (result.type === "COLUMN") {
                const shallow = [...ordered];
                shallow.splice(result.source.index, 1);
                setOrdered(shallow);
                return;
            }
            const column = columns[result.source.droppableId];
            const withQuoteRemoved = [...column];
            withQuoteRemoved.splice(result.source.index, 1);
            const orderedColumns = {
                ...columns,
                [result.source.droppableId]: withQuoteRemoved
            };
            setColumns(orderedColumns);
            return;
        }
        if (!result.destination) {
            return;
        }
        const source = result.source;
        const destination = result.destination;
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }
        if (result.type === "COLUMN") {
            const reorderedorder = reorder(ordered, source.index, destination.index);
            setOrdered(reorderedorder);
            return;
        }
        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination
        });
        setColumns(data.quoteMap);
        if ((result.source.droppableId !== result.destination.droppableId) && result.source.droppableId === 'orders_waiting_manufacture') {
            handleUpdateOrderWaitingManufactureToOrderWaitingCreated(result.draggableId);
        }
        if ((result.source.droppableId !== result.destination.droppableId) && result.source.droppableId === 'orders_waiting_created') {
            handleUpdateOrderWaitingCreatedToOrderWaitingManufacture(result.draggableId);
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                    ignoreContainerClipping={Boolean(containerHeight)}
                    isCombineEnabled={isCombineEnabled}
                >
                    {(provided) => (
                        <Container ref={provided.innerRef} {...provided.droppableProps}>
                            {ordered.map((key, index) => (
                                <Column
                                    key={key}
                                    title={titleKanbanOneOrderList[key]}
                                    color={colorsKanbanOneOrderList[index]}
                                    status={statusKanbanOneOrderList[index]}
                                    index={index}
                                    isFirstColumn={index === 0}
                                    quotes={columns[key]}
                                    isScrollable={withScrollableColumns}
                                    isCombineEnabled={isCombineEnabled}
                                    useClone={useClone}
                                    handleDetailOrder={handleDetailOrder}
                                />
                            ))}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    );
};

BoardMove.defaultProps = {
    isCombineEnabled: false,
};

BoardMove.propTypes = {
    isCombineEnabled: PropTypes.bool,
};

export default BoardMove;
