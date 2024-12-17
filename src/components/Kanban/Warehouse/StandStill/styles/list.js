import React, {useEffect, useState} from 'react';
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
  width: 18vw;
  overflow-y: auto;
`;

const Container = styled.div``;

const InnerQuoteList = React.memo(function InnerQuoteList(props) {
    const { color, status, isFirstColumn, isSecondColumn, isThirdColumn, isExport } = props;
    return props.quotes.map((quote, index) => (
        <QuoteItem
           key={quote.id}
           quote={quote}
           status={status}
           color={color}
           isFirstColumn={isFirstColumn}
           isSecondColumn={isSecondColumn}
           isThirdColumn={isThirdColumn}
           isExport={isExport}
        />
    ));
});

function InnerList(props) {
    const { quotes, status, color, isFirstColumn, isSecondColumn, isThirdColumn, isExport} = props;

    return (
        <Container>
            <div>
                <InnerQuoteList
                    quotes={quotes}
                    status={status}
                    color={color}
                    isFirstColumn={isFirstColumn}
                    isSecondColumn={isSecondColumn}
                    isThirdColumn={isThirdColumn}
                    isExport={isExport}
                />
            </div>
        </Container>
    );
}

export default function QuoteList(props) {
    const { quotes, title ,status,color ,isFirstColumn, isSecondColumn, isThirdColumn, isExport} = props;
    const [maxHeight, setMaxHeight] = useState('70vh');

  useEffect(() => {
    function handleResize() {
      if (window.innerHeight <= 700) {
        setMaxHeight(isExport ? '46vh' : '60vh');
      } else {
        setMaxHeight(isExport ? '58vh' : '70vh');
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExport]);

    return (
        <Wrapper style={{maxHeight: maxHeight}}>
            <InnerList
                quotes={quotes}
                title={title}
                status={status}
                color={color}
                isFirstColumn={isFirstColumn}
                isSecondColumn={isSecondColumn}
                isThirdColumn={isThirdColumn}
                isExport={isExport}
            />
        </Wrapper>
    );
}
