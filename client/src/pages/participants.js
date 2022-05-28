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
        if (!data.length==0){
            setParticipants(data);
        }
    }

    useEffect (() => {
        getData();
    }, []);


    function saveParticipants(){
        const data = request(`/regulation/${project}`, "POST", {participants:participants});
    }



    return(
        <div className="participants">
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
            <div className="participants__content">   
                <h1>Заинтересованные стороны</h1>
                <table>
                    <tr>
                        <th>Имя</th>
                        <th>Неосведомленный</th>
                        <th>Сопротивляющийся</th>
                        <th>Нейтральный</th>
                        <th>Поддерживающий</th>
                        <th>Лидирующий</th>
                    </tr>
                    {participants.map((element, index) => 
                    <tr key={index}>
                        <td>{element.name}</td>
                        <td>{element.uninformed}</td>
                        <td>{element.resisting}</td>
                        <td>{element.neutral}</td>
                        <td>{element.supporting}</td>
                        <td>{element.leading}</td>
                    </tr>)}
                    <tr>
                        <td>Виталий</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>ТЖ</td>
                    </tr>
                    <tr>
                        <td>Сергей</td>
                        <td></td>
                        <td></td>
                        <td>Т</td>
                        <td>Ж</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Давид</td>
                        <td></td>
                        <td>Т</td>
                        <td>Ж</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Алексей</td>
                        <td>Т</td>
                        <td></td>
                        <td></td>
                        <td>Ж</td>
                        <td></td>
                    </tr>
                </table>
                <div>
                    Т - текущий статус заинтересованной стороны <br/>
                    Ж - желаемый статус заинтересованной стороны <br/><br/>
                </div>
                <button>Добавить</button>
            </div>
            
        </div>
    )
}