import avatar from "./img/avatar.JPG";
import {CostModule} from "./CostModule.tsx";
import React, {useState} from "react";

export function Cost(){

    let [arrayCriticalPath, setArrayCriticalPath] = useState([
        {name:"Найм сотрудников", labor: 100}, 
        {name:"Договор с заказчиком", labor: 50}, 
        {name:"Найм сотрудников", labor: 100},
        {name:"Разработка требований", labor: 20},
        {name:"Разработка MVP", labor: 200}    
    ]);



    return(
        <div className="cost">
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
            <h1>Оценка стоимости</h1>
            {CostModule()}
            <div className="cost__tasks">
                <h1>Задачи критического пути</h1>
                <ul>
                    {arrayCriticalPath.map((element, index) => 
                        <li key={index}>
                            <div className="struct-work">
                                <input className="input-string" value={element.name} disabled/>
                                <input className="sumLabor" value={element.labor} disabled/>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}