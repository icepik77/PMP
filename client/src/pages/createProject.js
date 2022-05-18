import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";
import avatar from "./img/avatar.JPG";

export function CreateProject (){

    const {request, loading} = useHttp();
    const navigate = useNavigate();

    const [project, setProject] = useState([{name:"Недижимость"}, {name:"CRM"}, {name:"Серверная логика"}]);

    async function getData(){
        try {
            const data = await request("/createProject", "GET", null);
            data = JSON.parse(data);
            setProject(data);
        } catch (e) {}
    }

    const [form, setForm] = useState({
        name:''
    });

    const changeHandler = event =>{
        setForm({...form, [event.target.name]:event.target.value});
    };

    function addProject(){

        const data = request("/createProject", "POST", {...form});
        data.then(
            PromiseResult=>{
                if (PromiseResult.answer==="yes" && !loading){
                    console.log("The project add sucessfuly");
                }
            }
        );
    };

    return(
        <div className="create-project">
            <div className="header">
                <div className="str"> 
                    <div className="header__left-column">
    
                    </div>
                    <div className="header__right-column">   
                        <img src={avatar} className="avatar"/>
                        <div className="header__user">Сергей</div>
                    </div>
                </div>
            </div>
            <h1>Доступные проекты</h1>
        
            <ul>
                {project.map((element, index) => 
                    <li key={index}>
                        {element.name}
                    </li>)
                }
            </ul>
            <button onClick={ () => addProject()}>Создать проект</button>
        </div>
    );
};