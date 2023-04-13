import './posts.scss'
import Post from '../post/post';
import {useQuery} from '@tanstack/react-query';
import {makeRequest} from '../../axios';

export default function Posts({userId}) {
    const {isLoading, error, data} = useQuery(["posts"], () => {
        return makeRequest.get("/posts?userId=" + userId).then((res) => {
            console.log(res.data);
            return res.data;
        })
    })

    return (
        <div className="posts">
            {error ? 
            "Something went wrong!" :
            isLoading ? 
            "isLoading" :
            data.map(post => (
                <Post post={post} key={post.id}/>
            ))}
        </div>
    )
}