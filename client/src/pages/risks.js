import React  from "react";
import avatar from "./img/avatar.JPG";

export function Risks(){
    return(
        <div className="risks">
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
            <table>
                <tr>
                    <th>№</th>
                    <th>Событие риска</th>
                    <th>Вероятность</th>
                    <th>Влияние В/С/Н</th>
                    <th>Рейтинг риска</th>
                    <th>Приоритет риска</th>
                    <th>Вероятность в %</th>
                    <th>Влияние, USD</th>
                    <th>Рейтинг риска</th>
                    <th>Приоритет риска</th>
                    <th>Стратегия реагирования</th>
                    <th>Мероприятия по реагированию на риск</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Саботаж внедрения автоматизации менеджерами сети гостиниц</td>
                    <td>В</td>
                    <td>В</td>
                    <td>НП</td>
                    <td>1</td>
                    <td>60</td>
                    <td>100 000</td>
                    <td>60 000</td>
                    <td>1</td>
                    <td>Снижение</td>
                    <td>
                        1. Разработка системы дополнительной мотивации. Ответственный: владелец бизнеса. <br/>
                        2. Часть сотрудников отеля уволится. Заключить договор с HR агенством о найме новых сотрудников с определенным уровнем
                        компьютерной грамотности. Ответственный: владелец бизнеса. 
                    </td>
                </tr>
            </table>
            <button>Добавить</button>
        </div>
    );
};