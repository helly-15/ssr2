import React from "react"
import './Profile.css';


export const Profile = () => {
    return <div className = {'profile'}>
        <h2 className = {'profile__title'}> Профиль</h2>
        <div className = {'profile__cell_container'}>
            <div className = {'profile__cell'}>
                <span className = {'profile__cell_small'}> Дата регистрации </span>
                <span className = {'profile__cell_text'}> 17.01.2002</span>
            </div>
            <div className = {'profile__cell'}>
                <span className = {'profile__cell_small'}> Уставной капитал</span>
                <span className = {'profile__cell_text'}>10 110 000 ₽ </span>
            </div>
            <div className = {'profile__cell'}>
                <span className = {'profile__cell_small'}>Юридический адрес </span>
                <span className = {'profile__cell_text'}> ОБЛ. МОСКОВСКАЯ Г. Подольск Д. Коледино ТЕР. ИНДУСТРИАЛЬНЫЙ ПАРК КОЛЕДИНО Д. 6 СТР. 1 </span>
            </div>
            <div className = {'profile__cell'}>
                <span className = {'profile__cell_small'}> ОГРН</span>
                <span className = {'profile__cell_text'}>  1067746062449</span>
            </div>
            <div className = {'profile__cell'}>
                <span className = {'profile__cell_small'}> ИНН </span>
                <span className = {'profile__cell_text'}>  7721546864</span>
            </div>
        </div>
    </div>
}