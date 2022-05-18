import React, {useState} from "react";
import plus from "./img/plus.png";
import note from "./img/note.png";
import clock from "./img/clock.png";
import cross from "./img/cross.png";
import important from "./img/important.png";
import avatar from "./img/avatar.JPG";



export function ISW() {

    let [ISW, setISW] = useState({
        laborCommon:0,
        noteCommon:"",
        PackagesWork: []
    });

    let [arrayCriticalPath, setArrayCriticalPath] = useState([]);

    function setPackageWork(event) {
        let copy = Object.assign([], ISW.PackagesWork);
        copy[Number(event.target.name)].name = event.target.value;
        setISW({...ISW, PackagesWork: copy});
    }

    function setWork(event) {
        console.log(event.target.name);
        let copy = Object.assign([], ISW.PackagesWork);
        copy[event.target.name].works[event.target.id].name=event.target.value;
        setISW({...ISW, PackagesWork: copy});
    }

    function setTime(event){
        let copy = Object.assign([], ISW.PackagesWork);
        copy[event.target.name].works[event.target.id].labor = Number(event.target.value);
        setISW({...ISW, PackagesWork: copy});
    }

    function getTimePackageWork(index){
       let sum=0;
       ISW.PackagesWork[index].works.forEach(function(item,i) {
            sum=sum+item.labor;
            console.log(item);
        });
       let copy = Object.assign([], ISW.PackagesWork);
       copy[index].laborIntensity=sum;
       setISW({...ISW, PackagesWork: copy});
       console.log(sum);
    }
   
    function addPackageWork() {
        let copy = Object.assign([], ISW.PackagesWork);
        copy.push({
            name:"",
            laborIntensity:0,
            works:[]
        });
        setISW({...ISW, PackagesWork:copy});
    }

    function addWork(index) {
        let copy = Object.assign([], ISW.PackagesWork);
        copy[index].works.push({
            name: "",
            labor: 0,
        });
        setISW({...ISW, PackagesWork: copy});
    }

    function addCriticalTask(index, indexWork){
        let copy = Object.assign([], arrayCriticalPath);
        let element = {
            name: ISW.PackagesWork[index].works[indexWork].name,
            labor: ISW.PackagesWork[index].works[indexWork].labor
        }
        copy.push(element);
        setArrayCriticalPath(copy);
    }

    function deleteStructWork(index){
        let copy = Object.assign([], ISW.PackagesWork);
        delete copy[index];
        setISW({...ISW, PackagesWork:copy});
    }

    function deleteWork(index, indexWork){
        let copy = Object.assign([], ISW.PackagesWork);
        delete copy[index].works[indexWork];
        setISW({...ISW, PackagesWork:copy});
    }

    function deleteCriticalTask(index){
        let copy = Object.assign([], arrayCriticalPath);
        delete copy[index];
        setArrayCriticalPath(copy);
    }

    function getAllTimeISW(){
        let sum=0;
        ISW.PackagesWork.forEach(function(item){
            item.works.forEach(function(work){
                sum = sum + work.labor;
            });
        });
        setISW({laborCommon:sum, noteCommon:ISW.noteCommon, PackagesWork:ISW.PackagesWork});
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
            <div className="str">
                <div className="ISW__left-column">
                    <button onClick={() => addPackageWork()}>Добавить пакет работ</button>
                    <button onClick={() => getAllTimeISW()}>Рассчитать трудоемкость</button>
                    <h3>Трудоемкость проекта: {ISW.laborCommon}</h3>
                    <ul className="WBS-list">
                        {ISW.PackagesWork.map((element, index) =>
                            <li key={index}>
                                <div className="struct-work">
                                    <input value={element.name} name={index} onChange={(event) => setPackageWork(event)} 
                                        className="input-string" placeholder="Введите название структуры..."
                                    /> 
                                    <img src={plus} onClick={() => addWork(index)} className="btn-img"/> 
                                    <img src={note} className="btn-img"/>
                                    <img src={clock} className="btn-img" onClick={() => getTimePackageWork(index)}/>
                                    <img src={cross} className="btn-img" onClick={() => deleteStructWork(index)}/>
                                    <input value={element.laborIntensity} name={index} className="labor-input"/>
                                </div>
                                <ul>
                                    {ISW.PackagesWork[index].works.map((elementWork, indexWork) => 
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
                            </li>)
                        }
                    </ul>
                </div>
                <div className="ISW__right-column">
                    <h2>Задачи КП</h2>
                    <ul>
                        {arrayCriticalPath.map((element, index) => 
                            <li key={index}>
                                <div className="struct-work" onClick={() => deleteCriticalTask(index)}>
                                    <input className="input-string" value={element.name} disabled/>
                                    <input className="sumLabor" value={element.labor} disabled/>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
    
}