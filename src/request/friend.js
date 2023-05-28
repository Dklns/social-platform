import instance from './index';

export function getFollowedUsers() {
    return instance.get("/api/relationship/getFollowedUsers");
}

export function getFollowers() {
    return instance.get("/api/relationship/getFollowers");
}

export function cancelFollowing(userId) {
    return instance.delete("/api/relationship/cancelFollow", {
        params: {
            userId
        }
    });
}

export function follow(userId) {
    return instance.post("/api/relationship/follow", {
        userId
    })
}