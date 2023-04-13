import './stories.scss';
import {useContext} from 'react';
import { AuthContext } from '../../context/authContext';

export default function Stories() {
    const {currentUser} = useContext(AuthContext);
    
    const stories = [
        {
            id:1,
            name: 'klns',
            img: 'https://i.328888.xyz/2023/03/22/YvOPv.jpeg'
        },
        {
            id:2,
            name: 'llxs',
            img: 'https://i.328888.xyz/2023/03/22/YvHEU.jpeg'
        },
        {
            id:3,
            name: 'xlys',
            img: 'https://i.328888.xyz/2023/03/22/Yv22p.jpeg'
        },
        {
            id:4,
            name: 'ylrs',
            img: 'https://i.328888.xyz/2023/03/22/YvlqL.jpeg'
        }
    ]

    return (
        <div className="stories">
            <div className="story">
                    <img src={currentUser.profilePic} alt="" />
                    <span>{currentUser.name}</span>
                    <button>+</button>
                </div>
            {stories.map(story => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    )
}