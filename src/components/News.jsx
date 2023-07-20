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
    ];

    return (
        <div className="news-container">
            {newsStories.map(story => (
                <div key={story.id} className="news-block">
                    <img src={story.img} alt={story.title} className="news-image" />
                    <h4 className="news-title">{story.title}</h4>
                </div>
            ))}
        </div>
    );
};

export default News;
