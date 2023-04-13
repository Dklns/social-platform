import './comments.scss';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import {makeRequest} from '../../axios';
import moment from 'moment';
import {useMutation, useQueryClient, useQuery} from '@tanstack/react-query';

export default function Comments({postId}) {
    const [desc, setDesc] = useState("");
    const {currentUser} = useContext(AuthContext);
    const {isLoading, error, data} = useQuery(["comments"], () => {
        return makeRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    })

    const queryClient = useQueryClient();

    const mutation = useMutation((newComment) => {
        return makeRequest.post('/comments', newComment);
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
        }
    })

    async function handleClick(e) {
        e.preventDefault();
        mutation.mutate({desc, postId});
        setDesc('');
    }

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder='write a comment' onChange={e => setDesc(e.target.value)}/>
                <button onClick={handleClick}>Send</button>
            </div>
            {isLoading ? "isLoading"
            :data.map(comment => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePic} alt="" />
                    <div className="comment-info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>{moment(comment.createdAt).fromNow()}</span>
                </div>
            ))}
        </div>
    )
}