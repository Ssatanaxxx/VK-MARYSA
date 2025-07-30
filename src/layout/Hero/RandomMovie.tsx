import "./RandomMovie.css"


export const RandomMovie = ({ rating, date, genre, timeToMovie, name, description,  }) => {
    return (
        <div className="container">
            <div className="randomMovie__container">
                <div className="randomMovie__info">
                    <div className="info__data">
                        <span className="info__data-up">{rating}</span>
                        <span className="info__data-up">{date}</span>
                        <span className="info__data-up">{genre}</span>
                        <span className="info__data-up">{timeToMovie}</span>
                    </div>
                    <h1 className="info__title">{name}</h1>
                    <p className="info__decription">{description}</p>
                    <div className="info__buttons">
                        <button className="info__btn"></button>
                        <button className="info__btn"></button>
                        <button className="info__btn"></button>
                        <button className="info__btn"></button>
                    </div>
                </div>
                <div className="randomMovie__content-image">

                </div>
            </div>
        </div>
    )
}