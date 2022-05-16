import React from 'react';
import s from './forecastItem.module.css';

const ForecastItem = ({item}) => {
    let time = item[0];
    let temp = item[2];
    let main = item[3];
    return(
        <li className={s.item}>
            <span className={s.temp}>{temp}</span>
            <span className={s.main}>{main}</span>
            <span className={s.time}>After {time} h</span>
        </li>
    )
}

export default ForecastItem;