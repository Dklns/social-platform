import instance from './index';

export function getProfileData(userId) {
    return instance.get(`/api/user/get-id/${userId}`);
}

export function updateProfile(formData) {
    return instance.post("/api/user", {
        ...formData
    })
}