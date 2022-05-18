import React  from "react";
import avatar from "./img/avatar.JPG";

export function Regulation(){
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
                    <textarea></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Цель проекта:</h3>
                    <textarea></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Требования к проекту:</h3>
                    <textarea></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ограничения и допущения:</h3>
                    <textarea></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ключевые и контрольные события:</h3>
                    <textarea></textarea>
                </div>
                <div className="regulation__unit">
                    <h3>Ориентировочный бюджет проекта:</h3>
                    <textarea></textarea>
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
                        <tr>
                            <td>Игорь</td>
                            <td>Спонсор проекта, заказчик</td>
                            <td>РичБанк</td>
                            <td>Старт или остановка работ, решение критических вопросов</td>
                        </tr>
                        <tr>
                            <td>Петр</td>
                            <td>Спонсор проекта, топ-менеджер</td>
                            <td>АутсорсПро</td>
                            <td>Выделение ресурсов, решение критических вопросов</td>
                        </tr>
                        <tr>
                            <td>Давид</td>
                            <td>Руководитель продукта</td>
                            <td>РичБанк</td>
                            <td>Подготовка технического задания, проверка соответствия итогового продукта техническому заданию</td>
                        </tr>
                    </table>
                </div>
                <div>
                    <button>Добавить</button>
                    <button>Сохранить</button>
                </div>
            </div>
        </div>
    )
}