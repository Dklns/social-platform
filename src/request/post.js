import instance from './index';

export function getAllPost() {
    return instance.get("/api/post");
}

export function getPostByUserId(userId) {
    return instance.get("/api/post", {
        params: {
            userId
        }
    });
}

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
    if (commentId) {
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

export function deletePost(postId) {
    return instance.delete("/api/post", {
        params: {
            postId
        }
    })
}

export function likeComment(commentId) {
    return instance.post('/api/like/comment', {
        commentId
    })
}

export function cancelLikeComment(commentId) {
    return instance.delete('/api/like/comment', {
        params: {
            commentId
        }
    })
}

export function share(formData) {
    return instance.post('/api/post', formData)
}