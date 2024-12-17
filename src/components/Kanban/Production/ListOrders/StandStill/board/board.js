import React from "react";
import styled from "@xstyled/styled-components";
import colors from "../../../../../../constants/colors";
import PropTypes from "prop-types";
import Column from "./column";
import titleKanbanTwoOrderList from "../../../../../../constants/titleKanbanTwoOrderList";
import colorsKanbanTwoOrderList from "../../../../../../constants/colorsKanbanTwoOrderList";
import {statusKanbanTwoOrderList} from "../../../../../../constants/titleKanbanTwoOrderList";

const Container = styled.div`
  min-height: 50vh;
  min-width: 50vw;
  display: inline-flex;
`;

const BoardStandStill = ({initial, withScrollableColumns}) => {
    const columns = initial;
    const ordered = Object.keys(initial);

    return (
        <>
            <Container>
                {ordered.map((key, index) => (
                    <Column
                        key={key}
                        index={index}
                        title={titleKanbanTwoOrderList[key]}
                        quotes={columns[key]}
                        isScrollable={withScrollableColumns}
                        color={colorsKanbanTwoOrderList[index]}
                        status={statusKanbanTwoOrderList[index]}
                        isFirstColumn={index === 0}
                    />
                ))}
            </Container>
        </>
    );
};

BoardStandStill.defaultProps = {
    isCombineEnabled: false
};

BoardStandStill.propTypes = {
    isCombineEnabled: PropTypes.bool
};

export default BoardStandStill;
