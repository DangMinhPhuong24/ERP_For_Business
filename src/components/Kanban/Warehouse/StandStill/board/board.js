import React from "react";
import styled from "@xstyled/styled-components";
import PropTypes from "prop-types";
import Column from "./column";
import {colorsKanban} from "../../../../../constants/attributesKanbanImportWarehouse";
import {titleExportKanban} from "../../../../../constants/attributesKanbanExportWarehouse";

const Container = styled.div`
  min-height: 50vh;
  min-width: 50vw;
  display: inline-flex;
`;

const WarehouseImportBoardStandStill = ({ initial,title }) => {
    const columns = initial;
    const ordered = Object.keys(initial);

    return (
        <>
            <Container>
              {ordered.map((key, index) => {
                  const isExport = Object.keys(titleExportKanban).includes(key);
                return (
                  <Column
                    key={key}
                    index={index}
                    title={title[key]}
                    quotes={columns[key]}
                    color={colorsKanban[index]}
                    isFirstColumn={index === 0}
                    isSecondColumn={index === 1}
                    isThirdColumn={index === 2}
                    isExport={isExport}
                  />
                );
              })}

            </Container>
        </>
    );
};

WarehouseImportBoardStandStill.defaultProps = {
    isCombineEnabled: false
};

WarehouseImportBoardStandStill.propTypes = {
    isCombineEnabled: PropTypes.bool
};

export default WarehouseImportBoardStandStill;
