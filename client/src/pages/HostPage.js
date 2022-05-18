import React from "react";
import {Link} from "react-router-dom";
import {CostModule} from "./CostModule.tsx";
import avatar from "./img/avatar.JPG";

export const HostPage = () =>{
    return(
        <div className="main-page">
            <div className="main-page__data">
                <div className="header">
                    <img src={avatar} className="avatar"/>
                    <div className="header__user">Сергей</div>
                </div>
                <h1>Разработка серверной логики</h1>
                {CostModule()}
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to={"/regulation"}>Устав проекта </Link>  
                    </li>
                    <li>
                        <Link to={"/isw"}>ИСР</Link> 
                    </li>
                    <li>
                        <Link to={"/cost"}>Оценка стоимости</Link>
                    </li>
                    <li>
                        <Link to={"/risks"}>Риски</Link>  
                    </li>
                    <li>
                        <Link to={"/isw"}>Участники</Link>  
                    </li>
                    <li>
                        <Link to={"/isw"}>Отчет</Link>  
                    </li>
                    <li>
                        <Link to={"/isw"}>Добавить пользователя</Link>  
                    </li>
                    <li>
                        <Link to={"/isw"}>Выйти</Link>  
                    </li>
                </ul>
            </nav>
        </div> 
    )
   
}