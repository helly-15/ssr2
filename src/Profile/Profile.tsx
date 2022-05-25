import React from "react"
import './Profile.css';


export const Profile = ({profile}:any) => {
    return <div className={'profile'}>
        <h2 className={'profile__title'}> Профиль</h2>
        <div className={'profile__cell_container'}>
            <div className={'profile__cell'}>
                <span className={'profile__cell_small'}> Дата регистрации </span>
                <span className={'profile__cell_text'}> {profile.regDate}</span>
            </div>
            <div className={'profile__cell'}>
                <span className={'profile__cell_small'}> Уставной капитал</span>
                <span className={'profile__cell_text'}>{profile.capital} </span>
            </div>
            <div className={'profile__cell'}>
                <span className={'profile__cell_small'}>Юридический адрес </span>
                <span className={'profile__cell_text'}> {profile.address}  </span>
            </div>
            <div className={'profile__cell'}>
                <span className={'profile__cell_small'}> ОГРН</span>
                <span className={'profile__cell_text'}>  {profile.ogrn} </span>
            </div>
            <div className={'profile__cell'}>
                <span className={'profile__cell_small'}> ИНН </span>
                <span className={'profile__cell_text'}>  {profile.inn} </span>
            </div>
        </div>
    </div>
}