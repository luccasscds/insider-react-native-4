import styled from "styled-components/native";

export const Container = styled.View`
    padding: 14px;
`;

export const Title = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: ${props => props.size}px;
`;

export const RateContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 8px 0;
`;

export const Rate = styled.Text`
    color: #fff;
    font-size: 12px;
    padding-left: 4px;
`;

export const ActionContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const DetailButton = styled.TouchableOpacity`
    background-color: #E72F49;
    width: 85%;
    height: 30px;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
`;

export const DeleteButton = styled.TouchableOpacity`
    width: 15%;
    height: 30px;
    align-items: center;
    justify-content: center;
`;