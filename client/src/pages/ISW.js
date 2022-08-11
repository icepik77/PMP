import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { useHttp } from "../hooks/useHttp";
import {useNavigate} from "react-router-dom";

import plus from "./img/plus.png";
import note from "./img/note.png";
import clock from "./img/clock.png";
import cross from "./img/cross.png";
import important from "./img/important.png";
import avatar from "./img/avatar.JPG";
import crossForm from "./img/crossForm.png";
import { setMaxListeners } from "process";



export function ISW() {

    const {request, loading} = useHttp();
    const navigate = useNavigate();
    const project = localStorage.getItem("project");

    async function getData(){
        
        const data = await request(`/isw/${project}`, "GET");

        if (data.isw!= null || data.list!= null){
            
            setISW({...ISW, packagesWorks: data.isw.packagesWorks});
            data.list ? setArrayCriticalPath(data.list) : setArrayCriticalPath([]);
        }
    }

    useEffect (() => {
        getData();
    }, [])

    let [ISW, setISW] = useState({
        laborCommon:0,
        noteCommon:"",
        packagesWorkss: []
    });

    let [noteForm, setForm] = useState({
        index: null,
        text: ''
    });
    let [arrayCriticalPath, setArrayCriticalPath] = useState([]);

    

    function setPackageWork(event) {
        let copy = Object.assign([], ISW.packagesWorks);
        copy[Number(event.target.name)].name = event.target.value;
        setISW({...ISW, packagesWorks: copy});
    }

    function setWork(event) {
        let copy = Object.assign([], ISW.packagesWorks);
        copy[event.target.name].works[event.target.id].name=event.target.value;
        setISW({...ISW, packagesWorks: copy});
    }

    function setTime(event){
        let copy = Object.assign([], ISW.packagesWorks);
        copy[event.target.name].works[event.target.id].labor = Number(event.target.value);
        setISW({...ISW, packagesWorks: copy});
    }

    function getTimePackageWork(index){
       let sum=0;
       ISW.packagesWorks[index].works.forEach(function(item,i) {

            sum=sum+item.labor;
        });

       let copy = Object.assign([], ISW.packagesWorks);
       copy[index].laborIntensity=sum;
       setISW({...ISW, packagesWorks: copy});
    }
   
    function addPackageWork() {
        let copy = Object.assign([], ISW.packagesWorks);
        copy.push({
            name:"",
            note:"",
            laborIntensity:0,
            works:[]
        });
        setISW({...ISW, packagesWorks:copy});
    }

    function addWork(index) {
        let copy = Object.assign([], ISW.packagesWorks);
        copy[index].works.push({
            name: "",
            labor: 0,
        });
        setISW({...ISW, packagesWorks: copy});
    }

    function addCriticalTask(index, indexWork){
        let copy = Object.assign([], arrayCriticalPath.list);
        let element = {
            name: ISW.packagesWorks[index].works[indexWork].name,
            labor: ISW.packagesWorks[index].works[indexWork].labor
        }
        copy.push(element);
        setArrayCriticalPath({...arrayCriticalPath, list: copy});
    }

    function deleteStructWork(index){
        let copy = Object.assign([], ISW.packagesWorks);
        delete copy[index];
        setISW({...ISW, packagesWorks:copy});
    }

    function deleteWork(index, indexWork){
        let copy = Object.assign([], ISW.packagesWorks);
        delete copy[index].works[indexWork];
        setISW({...ISW, packagesWorks:copy});
    }

    function deleteCriticalTask(index){
        let copy = Object.assign([], arrayCriticalPath);
        delete copy[index];
        setArrayCriticalPath(copy);
    }

    function getAllTimeISW(){
        let sum=0;
        ISW.packagesWorks.forEach(function(item){
            item.works.forEach(function(work){
                sum = sum + work.labor;
            });
        });
        setISW({laborCommon:sum, noteCommon:ISW.noteCommon, packagesWorks:ISW.packagesWorks});
    }

    function saveISW(){
        
        const data = request(`/isw/${project}`, "POST", {ISW, arrayCriticalPath});
    }

    function showNotePackageWorks(index){

        let note = document.querySelector(".note");
        note.style.display = "flex";

        setForm({
            index: index,
            text: ISW.packagesWorks[index].note 
        });
    }

    function closeNoteForm(){

        let copy = Object.assign([], ISW.packagesWorks);
        copy[noteForm.index].note = noteForm.text;
        setISW({...ISW, packagesWorks:copy});     

        let note = document.querySelector(".note");
        note.style.display = "none";
    }

    const setNote = event =>{
        
        setForm({...noteForm, text: event.target.value})
    }

    return(
        <div className="ISW">
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
            <h1>Иерархическая структура работ</h1>
            <div className="note">
                <div>
                    <h2>Заметки</h2>
                    <img src={crossForm} onClick={() => closeNoteForm()}/>
                </div>
                <textarea id={noteForm.index} value={noteForm.text} onChange={setNote}></textarea>
            </div>
            <div className="str">
                <div className="ISW__left-column">
                    <div className="str">
                        <button onClick={() => addPackageWork()}>Добавить пакет работ</button>
                        <button onClick={() => getAllTimeISW()}>Рассчитать трудоемкость</button>
                        <button onClick={() => saveISW()}>Сохранить ИСР</button>
                    </div>
                    <h3>Трудоемкость проекта: {ISW.laborCommon}</h3>
                    <ul className="WBS-list">
                        {ISW.packagesWorks ? ISW.packagesWorks.map((element, index) =>
                            <li key={index}>
                                <div className="struct-work">
                                    <input value={element.name} name={index} onChange={(event) => setPackageWork(event)} 
                                        className="input-string" placeholder="Введите название структуры..."
                                    /> 
                                    <img src={plus} onClick={() => addWork(index)} className="btn-img"/> 
                                    <img src={note} className="btn-img" onClick={() => showNotePackageWorks(index)}/>
                                    <img src={clock} className="btn-img" onClick={() => getTimePackageWork(index)}/>
                                    <img src={cross} className="btn-img" onClick={() => deleteStructWork(index)}/>
                                    <input value={element.laborIntensity} name={index} className="labor-input"/>
                                </div>
                                <ul>
                                    {ISW.packagesWorks[index].works.map((elementWork, indexWork) => 
                                        <li key={indexWork}>
                                            <div className="struct-work">
                                                <input value={elementWork.name} name={index} id={indexWork}  key={indexWork}
                                                    className="input-string" placeholder="Введите название работы..." onChange={(event)=>setWork(event)}
                                                /> 
                                                <input className="sumLabor" value={elementWork.labor} name={index} 
                                                    id={indexWork} placeholder="Время" onChange={(event) => setTime(event) }
                                                />
                                                <img src={important} className="btn-img" onClick={() => addCriticalTask(index, indexWork)}/>
                                                <img src={cross} className="btn-img" onClick={() => deleteWork(index, indexWork)}/>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </li>) : ""
                        }
                    </ul>
                </div>
                <div className="ISW__right-column">
                    <h2>Задачи КП</h2>
                    <ul>
                        {arrayCriticalPath.list ? arrayCriticalPath.list.map((element, index) => 
                            <li key={index}>
                                <div className="struct-work" onClick={() => deleteCriticalTask(index)}>
                                    <input className="input-string" value={element.name} disabled/>
                                    <input className="sumLabor" value={element.labor} disabled/>
                                </div>
                            </li>
                        ) : ""}
                    </ul>
                </div>
            </div>
        </div>
    )
    
}