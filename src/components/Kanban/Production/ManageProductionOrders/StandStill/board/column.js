import React from "react";
import styled from "@xstyled/styled-components";
import colors from "../../../../../../constants/colors";
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
    const { title, quotes, color, status,isFirstColumn,isSecondColumn,isFourColumn,isFifthColumn} = props;

    return (
        <Container>
            <Header background={color}>
                <Title>
                    {t(title)}
                </Title>
            </Header>
            <QuoteList
                listId={title}
                listType="QUOTE"
                quotes={quotes}
                internalScroll={props.isScrollable}
                isCombineEnabled={Boolean(props.isCombineEnabled)}
                useClone={Boolean(props.useClone)}
                status={status}
                color={color}
                isFirstColumn={isFirstColumn}
                isSecondColumn={isSecondColumn}
                isFourColumn={isFourColumn}
                isFifthColumn={isFifthColumn}
            />
        </Container>
    );
};

export default Column;