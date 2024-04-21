import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useHotkeys } from 'react-hotkeys-hook';

function Popup({p,fun,win}){
    return(
        <div className="popup" style = {p ? {display: "block"} : {display: "none"}}>
            {win} won!! <br></br>
            <button onClick={()=>fun()}>Close</button>
        </div>
    );
}


function Row({ Bclass , p , col}){

    return(
        <div className="row">
            <FontAwesomeIcon icon={faArrowDown} id={p ? "ars":"art"} className={col == "ballg" ? "arrowg": "arroww"} /> 
            <div className={Bclass[5]}></div>
            <div className={Bclass[4]}></div>
            <div className={Bclass[3]}></div>
            <div className={Bclass[2]}></div>
            <div className={Bclass[1]}></div>
            <div className={Bclass[0]}></div>
        </div>
    );
}

function Container(){
    useHotkeys('enter', () => handleClk());
    useHotkeys('arrowleft', () => chngPntL());
    useHotkeys('arrowright', () => chngPntR());
    const allEqual = arr => arr.every(val => val === arr[0]);

    let board = [
        ["ball","ball","ball","ball","ball","ball"],
        ["ball","ball","ball","ball","ball","ball"],
        ["ball","ball","ball","ball","ball","ball"],
        ["ball","ball","ball","ball","ball","ball"],
        ["ball","ball","ball","ball","ball","ball"],
        ["ball","ball","ball","ball","ball","ball"],
        ["ball","ball","ball","ball","ball","ball"]
    ]

    const [bClass,changeClass] = useState(board);

    const [name,changeName] = useState("ballg");
    const [pointer,changePointer] = useState([true,false,false,false,false,false,false]);
    const [pop,changePop] = useState(false);

    const handleClk = () => {
        let i = 0
        for(i = 0; i < 7; i++){
            if(pointer[i] == true){
                break;
            }
        }
        const newarr = bClass.slice()
        for (let j = 0; j < 6; j++){
            if(newarr[i][j] == "ball"){
                newarr[i][j] = name;
                changeClass(newarr);
                break;
            }
        }
        if(winner()){
            changePop(true);
            changeClass(board);
        }

        if(name == "ballg"){ changeName("ballw"); }
        else{ changeName("ballg"); } //console.log(newarr);

    }

    const chngPntR = () => {
        const point = pointer.slice()
        for(let k = 0; k < 7; k++){
            if(point[k] == true){
                if(k == 6){
                    point[k] = false;
                    point[0] = true;
                    break;
                }
                else{
                    point[k] = false;
                    point[k+1] = true;
                    break;
                }
            }
        }
        changePointer(point);
    }

    const chngPntL = () => {
        const point = pointer.slice()
        for(let k = 0; k < 7; k++){
            if(point[k] == true){
                if(k == 0){
                    point[k] = false;
                    point[6] = true;
                    break;
                }
                else{
                    point[k] = false;
                    point[k-1] = true;
                    break;
                }
            }
        }
        changePointer(point);
    }

    const winner = () => {
        for(let z = 0; z < 7; z++){
            for(let y = 0; y < 3; y++){
                if(bClass[z][y] !== "ball"){
                    if(allEqual([bClass[z][y],bClass[z][y+1],bClass[z][y+2],bClass[z][y+3]])){
                        return true
                    }
                }
            }
        }

        for(let z = 0; z < 4; z++){
            for(let y = 0; y < 6; y++){
                if(bClass[z][y] !== "ball"){
                    if(allEqual([bClass[z][y],bClass[z+1][y],bClass[z+2][y],bClass[z+3][y]])){
                        return true
                    }
                }
            }
        }

        for(let z = 0; z < 4; z++){
            for(let y = 0; y < 3; y++){
                if(bClass[z][y] !== "ball"){
                    if(allEqual([bClass[z][y],bClass[z+1][y+1],bClass[z+2][y+2],bClass[z+3][y+3]])){
                        return true
                    }
                }
            }
        }
        for(let z = 0; z < 4; z++){
            for(let y = 3; y < 6; y++){
                if(bClass[z][y] !== "ball"){
                    console.log(bClass[z][y],bClass[z+1][y-1],bClass[z+2][y-2],bClass[z+3][y-3])
                    if(allEqual([bClass[z][y],bClass[z+1][y-1],bClass[z+2][y-2],bClass[z+3][y-3]])){
                        return true
                    }
                }
            }
        }

        return false;
    }


    return(
        <>
            <Popup p = {pop} fun = {()=>changePop(false)} win = {name == "ballg" ? "White": "Grey"}></Popup> 
            <div className = "container">
                <Row Bclass={bClass[0]} p ={pointer[0]} col = {name}></Row>
                <Row Bclass={bClass[1]} p ={pointer[1]} col = {name}></Row>
                <Row Bclass={bClass[2]} p ={pointer[2]} col = {name}></Row>
                <Row Bclass={bClass[3]} p ={pointer[3]} col = {name}></Row>
                <Row Bclass={bClass[4]} p ={pointer[4]} col = {name}></Row>
                <Row Bclass={bClass[5]} p ={pointer[5]} col = {name}></Row>
                <Row Bclass={bClass[6]} p ={pointer[6]} col = {name}></Row>
            </div> 
                     
        </> 
    );
}

export default Container;