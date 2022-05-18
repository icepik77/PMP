import avatar from "./img/avatar.JPG";

export function Participants() {
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