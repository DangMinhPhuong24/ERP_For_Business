import styled from '@xstyled/styled-components';
import colors from '../../../../../constants/colors';

export const Title = styled.h4`
    padding: 5px;
    transition: background-color ease 0.2s;
    flex-grow: 1;
    user-select: none;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    line-height: 14.06px;
    text-align: center;
`;

export const NoAvailable = styled.h4`
    font-size: 10px;
    font-style: italic;
    line-height: 17.71px;
    text-align: center;
    width: 18vw;
    color: ${colors.greyColor};
`;
