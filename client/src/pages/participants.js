import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";
import avatar from "./img/avatar.JPG";

export function Participants() {

    const {request, loading} = useHttp();
    const navigate = useNavigate();

    const project = localStorage.getItem("project");

    let [participants, setParticipants] = useState([{
        name:"",
        uninformed:"",
        resisting:"",
        neutral:"",
        supporting: "",
        leading: ""
    }]);

    async function getData(){

        const data = await request(`/participants/${project}`, "GET");
        console.log(data);
        
        if (!data.length==0){
            setParticipants(data);
        }
    }

    useEffect (() => {
        getData();
    }, []);


    function saveParticipants(){
        const data = request(`/participants/${project}`, "POST", {participants:participants});
    }

    const changeHandlerName = event =>{

        let copy = Object.assign([], participants);
        copy[event.target.alt].name = event.target.value;
        setParticipants(copy);
       
    }

    const changeHandlerUninformed = event =>{

        let copy = Object.assign([], participants);
        copy[event.target.alt].uninformed = event.target.value;
        setParticipants(copy);
    }

    const changeHandlerResisting = event =>{

        let copy = Object.assign([], participants);
        copy[event.target.alt].resisting = event.target.value;
        setParticipants(copy);
    }

    const changeHandlerNeutral = event =>{

        let copy = Object.assign([], participants);
        copy[event.target.alt].neutral = event.target.value;
        setParticipants(copy);
    }

    const changeHandlerSupporting = event =>{

        let copy = Object.assign([], participants);
        copy[event.target.alt].supporting = event.target.value;
        setParticipants(copy);
    }

    const changeHandlerLeading = event =>{

        let copy = Object.assign([], participants);
        copy[event.target.alt].leading = event.target.value;
        setParticipants(copy);
    }

    function addParticipant(){

        let copy = Object.assign([], participants);
        copy.push(
            {
                name:"",
                uninformed:"",
                resisting:"",
                neutral:"",
                supporting: "",
                leading: ""
            }
        );

        setParticipants(copy);
    }


    return(
        <div className="participants">
            <div className="header">
                <div className="str"> 
                    <div className="header__left-column">
                        <div>??????????????</div>
                        <div>??????</div>
                        <div>??????????</div>
                        <div>???????????? ??????????????????</div>
                        <div>???????????????????????????????? ??????????????</div>
                        <div>??????????</div>
                    </div>
                    <div className="header__right-column">   
                        <img src={avatar} className="avatar"/>
                        <div className="header__user">????????????</div>
                    </div>
                </div>
            </div>
            <div className="participants__content">   
                <h1>???????????????????????????????? ??????????????</h1>
                <table>
                    <tr>
                        <th>??????</th>
                        <th>??????????????????????????????</th>
                        <th>????????????????????????????????</th>
                        <th>??????????????????????</th>
                        <th>????????????????????????????</th>
                        <th>????????????????????</th>
                    </tr>
                    {participants.map((element, index) => 
                    <tr key={index}>
                        <td><input alt={index} name="name" value={element.name} onChange={changeHandlerName}/></td>
                        <td><input alt={index} name="uninformed" value={element.uninformed} onChange={changeHandlerUninformed}/></td>
                        <td><input alt={index} name="resisting" value={element.resisting} onChange={changeHandlerResisting}/></td>
                        <td><input alt={index} name="neutral" value={element.neutral} onChange={changeHandlerNeutral}/></td>
                        <td><input alt={index} name="supporting" value={element.supporting} onChange={changeHandlerSupporting}/></td>
                        <td><input alt={index} name="leading" value={element.leading} onChange={changeHandlerLeading}/></td>
                    </tr>)}
                    <tr>
                        <td>??????????????</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>????</td>
                    </tr>
                    <tr>
                        <td>????????????</td>
                        <td></td>
                        <td></td>
                        <td>??</td>
                        <td>??</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>??????????</td>
                        <td></td>
                        <td>??</td>
                        <td>??</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>??????????????</td>
                        <td>??</td>
                        <td></td>
                        <td></td>
                        <td>??</td>
                        <td></td>
                    </tr>
                </table>
                <div>
                    ?? - ?????????????? ???????????? ???????????????????????????????? ?????????????? <br/>
                    ?? - ???????????????? ???????????? ???????????????????????????????? ?????????????? <br/><br/>
                </div>
                <button onClick={() => addParticipant()}>????????????????</button>
                <button onClick={() => saveParticipants()}>??????????????????</button>
            </div>
            
        </div>
    )
}