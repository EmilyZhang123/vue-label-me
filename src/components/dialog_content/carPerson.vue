<template>
    <div>
        <div class="dialog-title">
            <span>人车2.5D属性窗口</span>
        </div>
        <div class="dialog-content">
            <div >
                <span class="type-tittle">类别</span>
                <el-select v-model='car'>
                    <el-option v-for = "car in carList"
                               :key = "Math.random()"
                               :label = 'car.text'
                               :value = "car.val">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "car === ('Car'||'Truck')">
                <span class="type-tittle">类型</span>
                <el-select v-model = 'type'>
                    <el-option v-for="type in typeList"
                               :key="Math.random()"
                               :value="type.val"
                               :label="type.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "car === ('Car'||'Truck')">
                <span class="type-tittle">侧面类型</span>
                <el-select v-model = 'position'>
                     <el-option v-for="position in positionList"
                                :key="Math.random()"
                                :value="position.val"
                                :label="position.text">
                     </el-option>
                </el-select>
            </div>
            <div class="type-box" style="text-align: center">
                <el-checkbox v-model="occluded">是否被截断</el-checkbox>
                <el-checkbox v-model="truncated">是否被遮挡</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'car-person',
    data(){
        return {
            occluded:false,
            truncated:false,
            car:'',
            position:'',
            type:'',
            carList:[
                {text:'小型车',val:'Car'},
                {text:'货车',val:'Truck'},
                {text:'自行车',val:'Bicycle'},
                {text:'摩托车',val:'Motorcycle'},
                {text:'骑行者',val:'Rider'},
                {text:'自行车+骑行者',val:'Cyclist'},
                {text:'摩托车+骑行者',val:'Motorcyclist'},
            ],
            typeList:[
                {text:'正面',val:'Front'},
                {text:'背面',val:'Back'},
            ],
            positionList:[
                {text:'左',val:'Left'},
                {text:'右',val:'Right'},
            ]
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