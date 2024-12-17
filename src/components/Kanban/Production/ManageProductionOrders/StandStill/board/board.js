import React from "react";
import styled from "@xstyled/styled-components";
import colors from "../../../../../../constants/colors";
import PropTypes from "prop-types";
import Column from "./column";
import titleKanbanManageProductionOrders, {
    statusKanbanManageProductionOrders
} from "../../../../../../constants/titleKanbanManageProductionOrders";
import colorsKanbanManageProductionOrders from "../../../../../../constants/colorsKanbanManageProductionOrders";

const Container = styled.div`
  min-height: 50vh;
  min-width: 50vw;
  display: inline-flex;
`;

const BoardManageProductionOrders = ({initial, withScrollableColumns}) => {
    const columns = initial;
    const ordered = Object.keys(initial);

    return (
        <>
            <Container>
                {ordered.map((key, index) => (
                    <Column
                        key={key}
                        index={index}
                        title={titleKanbanManageProductionOrders[key]}
                        quotes={columns[key]}
                        isScrollable={withScrollableColumns}
                        color={colorsKanbanManageProductionOrders[index]}
                        status={statusKanbanManageProductionOrders[index]}
                        isFirstColumn={index === 0}
                        isSecondColumn={index === 1}
                        isFourColumn={index === 3}
                        isFifthColumn={index === 4}
                    />
                ))}
            </Container>
        </>
    );
};

BoardManageProductionOrders.defaultProps = {
    isCombineEnabled: false
};

BoardManageProductionOrders.propTypes = {
    isCombineEnabled: PropTypes.bool
};

export default BoardManageProductionOrders;
