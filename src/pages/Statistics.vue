<script setup>
import { getUserInfo, getPostInfo, getMap, getMapData } from '../request/statistics';
import { reactive, onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const mapChartContainer = ref(null);
const barChartContainer = ref(null);
const state = reactive({
    isLoading: true,
})

onMounted(async () => {
    let res,
        mapData,
        barData,
        mapJSON;
    try {
        res = await getUserInfo();
        console.log('user', res);

        mapData = res.data.data;

        res = await getPostInfo();
        console.log('post', res);

        barData = res.data.data;


    } catch (error) {
        console.log(error);
    } finally {
        state.isLoading = false;
    }

    res = await getMap();
    mapJSON = JSON.stringify(res.data);

    echarts.registerMap('china', mapJSON);
    const mapChart = echarts.init(mapChartContainer.value);
    mapChart.setOption({
        title: {
            text: "各省份用户数量",
            textStyle: {
                color: "rgba(255,255,255,.8)"
            },
            top: '50px',
            left: 'center',
        },
        geo: {
            map: "china",
            itemStyle: {
                areaColor: "#0099ff",
                borderColor: "#00ffff",
                shadowColor: "rgba(230,130,70,0.5)",
                shadowBlur: 30,
                emphasis: {
                    focus: "self"
                }
            },
        },
        tooltip: {
            trigger: "item",
            formatter: ({ data }) => {
                return `${data.name}的用户数量为 ${data.value[2]}`
            }
        },
        visualMap: {
            type: "continuous",
            min: 1,
            max: 5,
            left: '25%',
            bottom: '20%',
            text: ["用户数量"],
            calculable: true,
            inRange: {
                color: ["#50a3ba", "#eac736", "#d94e5d"]
            },
            textStyle: {
                color: "#fff"
            }
        },
        series: [
            { // 散点图
                type: "scatter",
                data: mapData,
                coordinateSystem: 'geo'
            }
        ]
    })

    const barChart = echarts.init(barChartContainer.value);
    barChart.setOption({
        title: {
            text: "前七天发帖量",
            left: 'center',
            textStyle: {
                color: "rgba(255,255,255,.8)",
            },
            padding: 30
        },
        xAxis: {
            type: 'category',
            data: ["前七天", "前六天", "前五天", "前四天", "前三天", "前天", "昨天"],
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: 'bottom',
            textStyle: {
                color: '#fff'
            }
        },
        series: [
            {
                type: 'bar',
                data: barData,
                itemStyle: {
                    normal: {
                        color: '#e9bd39'
                    }
                }
            }
        ]
    })
})

</script>

<template>
    <div class='statistics'>
        <h1>
            数据统计量
        </h1>
        <div class="content" v-if="state.isLoading">
            <a-spin />
        </div>
        <div class="content" v-else>
            <div ref="mapChartContainer" class="map-chart">
            </div>
            <div ref="barChartContainer" class="bar-chart">
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.statistics {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #3d8fc6;
    padding-top: 30px;
    min-height: 100vh;

    h1 {
        text-align: center;
        color: #fff;
    }

    .content {
        display: flex;
        justify-content: center;
        width: 100%;

        .map-chart {
            width: 60%;
            height: 800px;
        }

        .bar-chart {
            width: 40%;
            height: 500px;
        }
    }
}
</style>