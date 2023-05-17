import instance from './index';

export function like(postId) {
    return instance.post('/api/like', {
        postId
    });
}

export function cancelLike(postId) {
    return instance.delete('/api/like', {
        params: {
            postId
        }
    })
}

export function getComments(postId) {
    return instance.get('/api/comment', {
        params: {
            postId
        }
    })
}

export function sendComment({ postId, content, commentId }) {
    console.log(content);
    if (commentId) {
        console.log('test');
        return instance.post('/api/comment', {
            postId,
            content,
            commentId
        })
    } else {
        return instance.post('/api/comment', {
            postId,
            content
        })
    }

}

export function share() {
    return instance.post('/api/post')
}