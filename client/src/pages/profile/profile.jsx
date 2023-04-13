import Posts from '../../components/posts/posts';
import './profile.scss'
import plaxo from '../../assets/imgs/plaxo.png';
import linkedin from '../../assets/imgs/linkedin.png';
import facebook from '../../assets/imgs/facebook.png';
import instagram from '../../assets/imgs/instagram.png';
import twiter from '../../assets/imgs/twitter.png';
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/update';

export default function Profile() {
    const [openUpdate, setOpenUpdate] = useState(false);
    const userId = parseInt(useLocation().pathname.split('/')[2]);
    const {currentUser} = useContext(AuthContext);

    const {isLoading, error, data} = useQuery(["user"], () => {
        return makeRequest.get("/user/find/" + userId).then((res) => {
            return res.data;
        })
    })

    const {isLoading: rIsLoading ,data: relationshipsData} = useQuery(["relationship"], () => {
        return makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
            return res.data;
        })
    });

    const queryClient = useQueryClient();

    const mutation = useMutation((following) => {
        if(following) return makeRequest.delete('/relationships?userId=' + userId);
        return makeRequest.post('/relationships', {userId});
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['relationship'])
        }
    })

    function handleFollow() {
        mutation.mutate(relationshipsData.includes(currentUser.id));
    }

    function showFollowButton() {
        return (userId === currentUser.id)
        ? (<button onClick={() => setOpenUpdate(true)}>update</button>) 
        : (<button onClick={handleFollow}>{relationshipsData.includes(currentUser.id)
        ? 'following'
        :  'follow'}</button>)
}

    return (
        <div className='profile'>
            {isLoading ? ('isLoading')
            : (<>
            <div className="images">
                <img src={data.coverPic} className='cover'/>
                <img src={data.profilePic} className='profilePic'/>
            </div>
            <div className="profile-container">
                <div className="profile-user-info">
                    <div className="left">
                    <a href="http://facebook.com">
                        <img src={instagram} alt="" />
                    </a>
                    <a href="http://facebook.com">
                        <img src={twiter} alt="" />
                    </a>
                    <a href="http://facebook.com">
                        <img src={facebook} alt="" />
                    </a>
                    <a href="http://facebook.com">
                        <img src={plaxo} alt="" />
                    </a>
                    <a href="http://facebook.com">
                        <img src={linkedin} alt="" />
                    </a>
                    </div>
                    <div className="center">
                        <span>{data.name}</span>
                        <div className="info">
                            <div className="item">
                                <i className="iconfont">&#xe602;</i>
                                <span>{data.city}</span>
                            </div>
                            <div className="item">
                                <i className="iconfont">&#xe654;</i>
                                <span>{data.website}</span>
                            </div>
                        </div>
                        { rIsLoading ? 'isLoading' : showFollowButton() }
                    </div>
                    <div className="right">
                        <i className="iconfont">&#xe61c;</i>
                        <i className="iconfont">&#xe719;</i>
                    </div>
                </div>
                <Posts userId={userId}/>
            </div></>)}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    );
};