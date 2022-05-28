import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";
import avatar from "./img/avatar.JPG";
import trash from "./img/delete.png";

export function CreateProject (){

    const {request, loading} = useHttp();
    const navigate = useNavigate();
    let indexNewTitle = 0;
    let user = localStorage.getItem("user");

    const [project, setProject] = useState([{name:"Недижимость"}, {name:"CRM"}, {name:"Серверная логика"}]);

    async function getData(){
        
        const data = await request(`/createProject/${user}`, "GET");
        setProject(data);
    }

    useEffect (() => {
        getData();
    }, [])
    
    async function addProject(){

        let title = await prompt("Введите название проекта", `Новый проект ${indexNewTitle}`);
        indexNewTitle++;

        const data = request(`/createProject/${user}`, "POST", {title: title, id: user});
        data.then(
            PromiseResult=>{
                setProject(PromiseResult);
            }
        );
    };

    async function deleteProject(index){
        let item = project[index];

        const data = request(`/deleteProject/${user}`, "POST", {id:item._id});
        data.then(
            PromiseResult =>{
                setProject(PromiseResult);
            }
        )
    }

    async function setIdProjectLocal(id){
        await localStorage.setItem('project', id);
    }

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
                {project ? project.map((element, index) => 
                    <li key={index} onClick={()=>setIdProjectLocal(element._id)}>
                        <Link to={`/HostPage/${element._id}`}>{element.name}</Link> 
                        <img src={trash} className="create-project__trash" onClick={() => deleteProject(index)}/>
                    </li>) : ''
                }
            </ul>
            <button onClick={ () => addProject()}>Создать проект</button>
        </div>
    );
};