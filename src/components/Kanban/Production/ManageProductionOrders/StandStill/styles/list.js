import React from 'react';
import styled from '@xstyled/styled-components';
import Title from './title';
import QuoteItem from './item';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 220px;
  max-height: 500px;
  overflow-y: auto;
`;

const Container = styled.div``;

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
    const { color, status, isFirstColumn,isSecondColumn,isFourColumn,isFifthColumn } = props;

    if (Array.isArray(props.quotes)) {
        return props.quotes.map((quote, index) => (
            <QuoteItem
                key={quote.id}
                quote={quote}
                status={status}
                color={color}
                isFirstColumn={isFirstColumn}
                isSecondColumn={isSecondColumn}
                isFourColumn={isFourColumn}
                isFifthColumn={isFifthColumn}
            />
        ));
    } else if (typeof props.quotes === 'object') {
        const quoteArray = Object.values(props.quotes);
        return quoteArray.map((quote, index) => (
            <QuoteItem
                key={quote.id}
                quote={quote}
                status={status}
                color={color}
                isFirstColumn={isFirstColumn}
                isSecondColumn={isSecondColumn}
                isFourColumn={isFourColumn}
                isFifthColumn={isFifthColumn}
            />
        ));
    } else {
        return null;
    }
});


function InnerList(props) {
    const { quotes, status, color, isFirstColumn,isSecondColumn,isFourColumn,isFifthColumn } = props;
    const title = props.title ? <Title>{props.title}</Title> : null;

    return (
        <Container>
            {title}
            <div>
                <InnerQuoteList
                    quotes={quotes}
                    status={status}
                    color={color}
                    isFirstColumn={isFirstColumn}
                    isSecondColumn={isSecondColumn}
                    isFourColumn={isFourColumn}
                    isFifthColumn={isFifthColumn}
                />
            </div>
        </Container>
    );
}

export default function QuoteList(props) {
    const { quotes, title ,status,color ,isFirstColumn,isSecondColumn,isFourColumn,isFifthColumn} = props;

    return (
        <Wrapper>
            <InnerList
                quotes={quotes}
                title={title}
                status={status}
                color={color}
                isFirstColumn={isFirstColumn}
                isSecondColumn={isSecondColumn}
                isFourColumn={isFourColumn}
                isFifthColumn={isFifthColumn}
            />
        </Wrapper>
    );
}
