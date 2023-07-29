import React, {useRef} from 'react';
import '../styles/News.css';
import image from "../assets/image.jpeg"

import news from "../assets/news.json" //news data from calling api 

const News = () => {
    // Placeholder data
    const newsStories = news["data"].filter(story => story.image !== null);
    const count = useRef(0); 

    return (
        <>  
        <div className="news-overall">
            <h2 className="news-stories">Top Stories:</h2> 
            <div className="news-container-primary">
                {newsStories.map((story, index) => {
                    if(count.current < 3){
                        count.current++; 
                        return (<div key={index} className="news-block-primary" onClick={() => window.open(story.url, "_blank")}>
                            <img src={story.image} alt={story.title} className="news-image-primary" />
                            <h4 className="news-title-primary">{story.title}</h4>
                        </div>)
                    }
            })}
            </div>
            <div className="news-container">
                {newsStories.map((story, index) => {
                    return (<div key={index} className="news-block-secondary" onClick={() => window.open(story.url, "_blank")}>
                            <img src={story.image} alt={story.title} className="news-image-secondary" />
                            <h4 className="news-title-secondary">{story.title}</h4>
                        </div>)
                    }
                )}
            </div>
        </div>
        </>
    );
};

export default News;
