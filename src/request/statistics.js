import instance from '.';
import axios from 'axios';

export function getUserInfo() {
    return instance.get('/api/statistics/user');
}

export function getPostInfo() {
    return instance.get("/api/statistics/post");
}

export function getMap() {
    return axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json');
}

export function getMapData() {
    return Promise.resolve([
        { name: "北京市", value: [116.4074, 39.9042, getRandomInt(0, 100)] },
        { name: "天津市", value: [117.2008, 39.0840, getRandomInt(0, 100)] },
        { name: "河北省", value: [115.4838, 38.1350, getRandomInt(0, 100)] },
        { name: "山西省", value: [112.5624, 37.8734, getRandomInt(0, 100)] },
        { name: "内蒙古自治区", value: [111.7662, 40.8174, getRandomInt(0, 100)] },
        { name: "辽宁省", value: [123.4294, 41.8354, getRandomInt(0, 100)] },
        { name: "吉林省", value: [125.3245, 43.8868, getRandomInt(0, 100)] },
        { name: "黑龙江省", value: [126.6424, 45.7569, getRandomInt(0, 100)] },
        { name: "上海市", value: [121.4737, 31.2304, getRandomInt(0, 100)] },
        { name: "江苏省", value: [119.3685, 33.0139, getRandomInt(0, 100)] },
        { name: "浙江省", value: [119.9572, 29.1595, getRandomInt(0, 100)] },
        { name: "安徽省", value: [117.2830, 31.8612, getRandomInt(0, 100)] },
        { name: "福建省", value: [119.2965, 26.0737, getRandomInt(0, 100)] },
        { name: "江西省", value: [115.8581, 28.6820, getRandomInt(0, 100)] },
        { name: "山东省", value: [117.0204, 36.6683, getRandomInt(0, 100)] },
        { name: "河南省", value: [113.7534, 34.7655, getRandomInt(0, 100)] },
        { name: "湖北省", value: [114.2985, 30.5844, getRandomInt(0, 100)] },
        { name: "湖南省", value: [112.9823, 28.1941, getRandomInt(0, 100)] },
        { name: "广东省", value: [113.2663, 23.1322, getRandomInt(0, 100)] },
        { name: "广西壮族自治区", value: [108.3275, 22.8152, getRandomInt(0, 100)] },
        { name: "海南省", value: [109.5119, 19.1805, getRandomInt(0, 100)] },
        { name: "重庆市", value: [106.5516, 29.5630, getRandomInt(0, 100)] },
        { name: "四川省", value: [102.9199, 30.1904, getRandomInt(0, 100)] },
        { name: "贵州省", value: [106.7114, 26.5768, getRandomInt(0, 100)] },
        { name: "云南省", value: [101.3431, 24.4753, getRandomInt(0, 100)] },
        { name: "西藏自治区", value: [88.7879, 31.6846, getRandomInt(0, 100)] },
        { name: "陕西省", value: [108.9542, 34.2655, getRandomInt(0, 100)] },
        { name: "甘肃省", value: [103.8236, 36.0580, getRandomInt(0, 100)] },
        { name: "青海省", value: [96.2402, 35.4199, getRandomInt(0, 100)] },
        { name: "宁夏回族自治区", value: [106.2380, 38.4924, getRandomInt(0, 100)] },
        { name: "新疆维吾尔自治区", value: [87.6177, 43.7928, getRandomInt(0, 100)] }
    ])
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}