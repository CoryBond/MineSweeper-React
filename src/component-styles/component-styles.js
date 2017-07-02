import styled from 'styled-components';
//import {Navbar, Nav, NavItem, DropdownButton, MenuItem, Button} from 'react-bootstrap'


export const Gameboard = styled.div`
    margin: 0;
    auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const GameboardTable = styled.table`
    text-align:center;
    margin: 0px auto;
`;

export const MineSweepSection = styled.div`
    text-align:center;
`;

export const MineSweepHeaderBar = styled(MineSweepSection)`
`;

export const MineSweepBody = styled(MineSweepSection)`
`;

export const MineSweepHeader = styled.span`
`;

export const MineSweepHeaderFlag = styled.span`
    color: ${(props) => props.children[1] > 0 ? 'palevioletred' :
                        props.children[1] < 0 ? 'red' : 
                        props.children[1] === 0 ? 'green' : 
                        'black'};
`;

export const MineSweepHead = styled.img`
    height: 50px;
    width: 50px;
`;

export const TileButton = styled.button`
    height: 20px;
    width: 20px;
    margin: 0;
    color: ${(props) => props.children === "n" ? 'rgba(0, 0, 0, 0)' :
                        props.children === "f" ? 'rgba(0, 0, 0, 0)' : 
                        props.children === "b" ? 'rgba(0, 0, 0, 0)' : 
                        props.children === "" ? 'rgba(0, 0, 0, 0)' :
                        props.children == "1" ? 'teal' : 
                        props.children == "2" ? 'violet' : 
                        props.children == "3" ? 'purple' : 
                        props.children == "4" ? 'maroon' : 
                        props.children == "5" ? 'cornflowerblue ' : 
                        props.children == "6" ? 'orange' : 
                        props.children == "7" ? 'black' : 
                        props.children == "8" ? 'red' : 
                        ''};
    background: ${(props) => props.children === "f" ? 'url(./src/resources/tiles/Red-Flag.png)' : 
                             props.children === "b" ? 'url(./src/resources/tiles/bomb.png)' : 
                             props.children === "" ? 'darkgray' :
                             ''};
    background-size: 20px 20px;
    background-repeat:no-repeat;
`;