import avatar from "./img/avatar.JPG";

export function Header(){
    return(
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
    )
}