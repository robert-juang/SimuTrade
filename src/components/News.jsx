import React from 'react';
import '../styles/News.css';
import image from "../assets/image.jpeg"

const News = () => {
    // Placeholder data
    const newsStories = [
        { id: 1, title: 'Gojo Kicks some serious ass', img: image },
        { id: 2, title: 'Gojo Kicks some serious ass', img: image },
        { id: 3, title: 'Gojo Kicks some serious ass', img: image },
        { id: 4, title: 'Gojo Kicks some serious ass', img: image },
        { id: 5, title: 'Gojo Kicks some serious ass', img: image },
        { id: 6, title: 'Gojo Kicks some serious ass', img: image }
    ];

    return (
        <>  
        <div className="news-overall">
            <h2 className="news-stories">Top Stories:</h2> 
            <div className="news-container-primary">
                <div key={0} className="news-block-primary">
                    <img src={image} alt={"Speiccal news"} className="news-image-primary" />
                    <h4 className="news-title-primary">{"I like a person idk why"}</h4>
                </div>
                <div key={0} className="news-block-primary">
                    <img src={image} alt={"Speiccal news"} className="news-image-primary" />
                    <h4 className="news-title-primary">{"I like a person idk why"}</h4>
                </div>
                <div key={0} className="news-block-primary">
                    <img src={image} alt={"Speiccal news"} className="news-image-primary" />
                    <h4 className="news-title-primary">{"I like a person idk why"}</h4>
                </div>
            </div>
            <div className="news-container">
                {newsStories.map(story => (
                    <div key={story.id} className="news-block-secondary">
                        <img src={story.img} alt={story.title} className="news-image-secondary" />
                        <h4 className="news-title-secondary">{story.title}</h4>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default News;
