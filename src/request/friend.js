import instance from './index';

export function getFollowedUsers() {
    return instance.get("/api/relationship/getFollowedUsers");
}

export function getFollowers() {
    return instance.get("/api/relationship/getFollowers");
}