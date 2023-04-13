import {Link} from 'react-router-dom';
import {useContext, useState} from 'react';
import Comments from '../comments/comments'
import './post.scss'
import moment from 'moment';
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';

export default function Post({post}) {
    const [openComment, setOpenComment] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const {isLoading, error, data} = useQuery(["likes", post.id], () => {
        return makeRequest.get("/likes?postId=" + post.id).then((res) => {
            return res.data;
        })
    })

    const queryClient = useQueryClient();

    const mutation = useMutation((liked) => {
        if(liked) return makeRequest.delete('/likes?postId=' + post.id);
        return makeRequest.post('/likes', {postId: post.id});
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["likes"]);
        }
    })

    const deleteMutation = useMutation((postId) => {
        return makeRequest.delete('/posts/' + postId);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    })

    function handleLike() {
        mutation.mutate(data.includes(currentUser.id));
    }

    function handleDelete() {
        deleteMutation.mutate(post.id);
    }

    return (
        <div className="post">
            <div className="container">
            <div className="user">
                <div className="user-info">
                    <img src={post.profilePic}/>
                    <div className="details">
                        <Link to={`/profile/${post.userId}`}>
                            <span className='name'>{post.name}</span>
                        </Link>
                        <span className='date'>{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <i className='iconfont more' onClick={() => setOpenMenu(!openMenu)}>&#xe719;</i>
                {openMenu && post.userId === currentUser.id && <button onClick={handleDelete}>delete</button>}
            </div>
            <div className="content">
                <p>{post.desc}</p>
                <img src={post.img} alt="" />
            </div>
            <div className="info">
                <div className="item">
                    {isLoading ? 'isLoading' : (data.includes(currentUser.id)) ?
                    (<i className='iconfont like' style={{color:'red'}} onClick={handleLike}>&#xe8c3;</i>)
                    : (<i className='iconfont like' onClick={handleLike}>&#xeca1;</i>)}
                    {data?.length} Likes
                </div>
                <div className="item" onClick={() => {setOpenComment(!openComment)}}>
                    <i className="iconfont comments">&#xe6ad;</i>
                    12 Comments
                </div>
                <div className="item">
                    <i className="iconfont share">&#xe739;</i>
                    Share   
                </div>
            </div>
            {openComment && <Comments postId={post.id}/>}
            </div>
        </div>
    )
}