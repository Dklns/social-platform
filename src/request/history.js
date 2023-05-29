import instance from ".";

export function getHistory() {
    return instance.get('/api/history');
}

export function addHistory(postId) {
    return instance.post('/api/history', {
        postId
    });
}

export function deleteHistory(id) {
    return instance.get('/api/history/single', {
        params: {
            id
        }
    })
};

export function deleteAllHistory() {
    return instance.delete('/api/history');
}