<template>
    <div>
        <div class="dialog-title">
            <span>停车位标注属性窗口</span>
        </div>
        <div class="dialog-content">
            <div >
                <span class="type-tittle">类别</span>
                <el-select v-model='lane_class'>
                    <el-option v-for = "lane in laneClassList"
                               :key = "Math.random()"
                               :label = 'lane.text'
                               :value = "lane.val">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box">
                <span class="type-tittle">id</span>
                <el-input v-model="id" style="width: 200px"></el-input>
            </div>
            <div class="type-box" v-show = "lane_class === 'Marking_Point'">
                <span class="type-tittle">入口点类别</span>
                <el-select v-model = 'name'>
                    <el-option v-for="name in nameList"
                               :key="Math.random()"
                               :value="name.val"
                               :label="name.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'Obstacle'">
                <span class="type-tittle">停车位类别</span>
                <el-select v-model = 'name'>
                   <el-option value="Floor_lock" label="地锁"></el-option>
                   <el-option value="Cone_barre" label="锥桶"></el-option>
                   <el-option value="stopper" label="档位器"></el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'Obstacle' && name === 'Floor_lock'">
                <span class="type-tittle">地锁状态</span>
                <el-select v-model = 'lock_type'>
                   <el-option value="open" label="打开"></el-option>
                   <el-option value="close" label="关闭"></el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'Slot_Info'">
                <span class="type-tittle">停车位类别</span>
                <el-select v-model = 'name'>
                    <el-option v-for="name in nameList"
                               :key="Math.random()"
                               :value="name.val"
                               :label="name.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box">
                <span class="type-tittle">夹角</span>
                <el-input v-model="angle" style="width: 200px"></el-input>
            </div>
            <div class="type-box" v-show = "lane_class === 'Marking_Point'">
                <span class="type-tittle">停车位四个角id</span>
                <el-input v-model="mps_txt" style="width: 200px" placeholder="从左上依次输入四个角id,用;分割"></el-input>
            </div>
            <div class="type-box" style="text-align: center">
                <el-checkbox v-show="lane_class === 'Slot_Info'" v-model="is_completed">完整车位</el-checkbox>
                <el-checkbox v-show="lane_class !== 'Slot_Info'" v-model="occluded">是否被截断</el-checkbox>
                <el-checkbox v-show="lane_class === ('Marking_Point'||'Obstacle')" v-model="truncated">是否被遮挡</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
    import ElOption from "element-ui/packages/select/src/option";

    export default {
        components: {ElOption},
        name:'parking-slot',
        data(){
            return {
                mps_txt:'',//停车位四个角id
                is_completed:'',//完整车位
                occluded:false,
                truncated:false,
                car:'',
                lane_class:'',//标注类别
                laneClassList:[
                    {text:'入口点',val:'Marking_Point'},
                    {text:'停车位',val:'Slot_Info'},
                    {text:'障碍物',val:'Obstacle'},
                    {text:'可行驶空间',val:'FreeSpace'},
                    {text:'路沿',val:'RoadSide'},
                ],
                id:'',
                angle:'',
                name:'',//入口点类别
                nameList:[
                    {text:'T形角点连接',val:'T_conn_class'},
                    {text:'L形角点连接',val:'L_conn_class'},
                    {text:'T形角点不连接',val:'T_unconn_class'},
                    {text:'L形角点不连接',val:'L_unconn_class'},
                    {text:'I型角点无连接',val:'I_unconn_class'},
                    {text:'路沿T',val:'curb_T'},
                    {text:'环形车位',val:'circle_I'},
                    {text:'其他',val:'other'},
                ],
                park_type:'',//停车位类别
                parkTypeList:[
                    {text:'垂直',val:'perpendicular'},
                    {text:'平行',val:'parallel'},
                    {text:'斜向',val:'slane'},
                ],
                lock_type:'',//地锁状态
            }
        },
        methods:{}
    }
</script>
<style scoped>
    .dialog-title {
        border-bottom :1px solid #dddeea;
        padding:5px;
        font-weight: bold;
        color: #00005f;
    }
    .dialog-content {
        padding: 10px;
    }
    .type-box {
        padding-top: 10px;
    }
    .type-tittle {
        display: inline-block;
        width: 80px;
        padding-right: 5px;
        text-align: right;
    }
</style>