import instance from "."

export function getChat(userId) {
    return instance.get("/api/chat", {
        params: {
            userId
        }
    })
}

export function sendMessage(userId, message) {
    return instance.post("/api/chat", {
        userId,
        message
    })
}

export function deleteAll(userId) {
    return instance.delete('/api/chat', {
        params: {
            userId
        }
    })
}