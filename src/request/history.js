import instance from ".";

export function getHistory() {
    return instance.get('/api/history');
}

export function addHistory(postId) {
    return instance.post('/api/history', {
        postId
    });
}