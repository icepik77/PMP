import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";
import avatar from "./img/avatar.JPG";

export function Regulation(){
    let [blank, setBlank] = useState({
        businessTarget: '',
        projectTarget: ' ',
        requirements: ' ',
        restriction: ' ',
        controlPoints: ' ',
        budget: ' ',
        table:[{
            name: ' ',
            role: ' ',
            company: ' ',
            resopnsibility: ' ',
        },
        ]
    });

    const {request, loading} = useHttp();
    const navigate = useNavigate();
    const project = localStorage.getItem("project");

    async function getData(){
        
        const data = await request(`/regulation/${project}`, "GET");
        if (!data.length==0){
            setBlank({
                businessTarget: data[0].businessTarget,
                projectTarget: data[0].projectTarget,
                requirements: data[0].requirements,
                restriction: data[0].restriction,
                controlPoints: data[0].controlPoints,
                budget: data[0].budget,
                table: data[0].table
            });
            console.log(blank);
        }
    }

    useEffect (() => {
        getData();
    }, [])

    function saveRegulation(){
        const data = request(`/regulation/${project}`, "POST", {blank:blank});
    }
    
    const changeHandler = event =>{

        setBlank({...blank, [event.target.name]:event.target.value});
    }

    const changeTableName = event =>{
        
        let copy = blank.table;
        copy[event.target.alt].name = event.target.value;

        setBlank({...blank, table:copy});
    }

    const changeTableRole = event =>{
        let copy = blank.table;
        copy[event.target.alt].role = event.target.value;

        setBlank({...blank, table:copy});
    }

    const changeTableCompany = event =>{
        
        let copy = blank.table;
        copy[event.target.alt].company = event.target.value;

        setBlank({...blank, table:copy});
    }

    const changeTableRes = event =>{
        
        let copy = blank.table;
        copy[event.target.alt].resopnsibility = event.target.value;

        setBlank({...blank, table:copy});
    }

    function addParticipant(){
        let copy = blank.table;
        console.log("blank "+blank);
        copy.push({
            name:' ',
            role:' ',
            company:' ',
            resopnsibility:' '
        });
        setBlank({...blank, table: copy});
    }

    return(
        <div className="regulation">
            <div className="header">
                <div className="str"> 
                    <div className="header__left-column">
                        <div>Главная</div>
                        <div>ИСР</div>
                        <div>Риски</div>
                        <div>Оценка стоимости</div>
                        <div>Заинтересованные стороны</div>
                        <div>Отчет</div>
                    </div>
                    <div className="header__right-column">   
                        <img src={avatar} className="avatar"/>
                        <div className="header__user">Сергей</div>
                    </div>
                </div>
            </div>
            <h1>Устав проекта</h1>
            <div className="regulation__notice">
                <div className="regulation__unit">
                    <h3>Бизнес-цель проекта:</h3>
                    <textarea name="businessTarget" onChange={changeHandler} value={blank.businessTarget}></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Цель проекта:</h3>
                    <textarea name="projectTarget" onChange={changeHandler} value={blank.projectTarget}></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Требования к проекту:</h3>
                    <textarea name="requirements" onChange={changeHandler} value={blank.requirements}></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ограничения и допущения:</h3>
                    <textarea name="restriction" onChange={changeHandler} value={blank.restriction}></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ключевые и контрольные события:</h3>
                    <textarea name="controlPoints" onChange={changeHandler} value={blank.controlPoints}></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ориентировочный бюджет проекта:</h3>
                    <textarea name="budget" onChange={changeHandler} value={blank.budget}></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ключевые заинтересованные стороны:</h3>
                    <table>
                        <tr>    
                            <th>Имя</th>
                            <th>Роль</th>
                            <th>Компания</th>
                            <th>Ответственность</th>
                        </tr>
                        {blank.table ? blank.table.map((element, index)=>
                            <tr key={index}>
                                <td><input alt={index} name="name" value={element.name} onChange={changeTableName}/></td>
                                <td><input alt={index} name="role" value={element.role} onChange={changeTableRole}/></td>
                                <td><input alt={index} name="company" value={element.company} onChange={changeTableCompany}/></td>
                                <td><input alt={index} name="resopnsibility" value={element.resopnsibility} onChange={changeTableRes}/></td>
                            </tr>
                        ) : ''}   
                    </table>
                </div>
                <div>
                    <button onClick={() => saveRegulation()}>Сохранить</button>
                    <button onClick={() => addParticipant()}>Новый участник</button>
                </div>
            </div>
        </div>
    )
}