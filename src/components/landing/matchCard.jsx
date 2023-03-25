import React from 'react';
import pinIcon from "../assets/pin.png"
import moment from 'moment';


const MatchCard = ({ match, showDetails = true }) => {
    function handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(match))
        localStorage.setItem("onClickMatch", match._id)
        return window.location.href = "/purchase"
    }

    return (

        <div>
            {/* 2 Teams  */}
            {match ?
                <div className="match-item">
                    {moment(match.date).isBefore(Date.now()) ?
                        <div className="time-area">
                            <div className="time">
                                <h4>MATCH ENDED</h4>
                            </div>
                            <h4 className="match-time">{moment(match.date).fromNow()}</h4>
                        </div>
                        :
                        <div className="time-area">
                            <div className="time">
                                <h4 className="day">{moment(match.date).format('ddd')}</h4>
                                <h4 className="month">{moment(match.date).format('MMM')}</h4>
                                <h4 className="date">{moment(match.date).format('D')}</h4>
                            </div>
                            <h4 className="match-time">{moment(match.date).format('h:mm a')}</h4>
                        </div>}
                    <div className="flags">
                        <div className="home-flag">
                            <div className='flag-div'><img src={match.logoHomeClub} className="flag" /></div>
                            <div><h5 className="home-team">{match.nameHomeClub}</h5></div>
                        </div>
                        <span className="vs">
                            VS
                        </span>
                        <div className="away-flag">
                            <div className='flag-div'><img src={match.logoAwayClub} className="flag" /></div>
                            <h5 className="home-team">{match.nameAwayClub}</h5>
                        </div>
                    </div>
                    <div className="match-info">
                        <img className='icon' src={pinIcon} alt="" /> <h4 className="group">{match.nameStadium}</h4>
                        {showDetails ? <button className="match-badge" onClick={handleSubmit} >TICKET</button> : <p></p>}
                    </div>
                </div>
                : <a href=""></a>}
        </div>
    );
};

export default MatchCard;
