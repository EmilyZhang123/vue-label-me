<template>
    <div>
        <div class="dialog-title">
            <span>车道线属性窗口</span>
        </div>
        <div class="dialog-content">
            <div >
                <span class="type-tittle">车道线种类</span>
                <el-select v-model='lane_class'>
                    <el-option v-for = "laneClass in laneClassList"
                               :key = "Math.random()"
                               :label = 'laneClass.text'
                               :value = "laneClass.val">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box">
                <span class="type-tittle">id</span>
                <el-input v-model="id" style="width: 200px"></el-input>
            </div>
            <div class="type-box" v-show = "lane_class === 'lane'">
                <span class="type-tittle">车道线类型</span>
                <el-select v-model = 'lanetype'>
                    <el-option v-for="lanetype in laneTypeList"
                               :key="Math.random()"
                               :value="lanetype.val"
                               :label="lanetype.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'lane'">
                <span class="type-tittle">车道线颜色</span>
                <el-select v-model = 'type'>
                    <el-option v-for="type in typeList"
                               :key="Math.random()"
                               :value="type.val"
                               :label="type.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'lane'">
                <span class="type-tittle">车道线线型</span>
                <el-select v-model = 'lanestyle'>
                    <el-option value="dash" label="虚线"></el-option>
                    <el-option value="solid" label="实线"></el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'lane'">
                <span class="type-tittle">车道线位置</span>
                <el-select v-model = 'position'>
                    <el-option v-for="position in positionList"
                               :key="Math.random()"
                               :value="position.val"
                               :label="position.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === 'curb'">
                <span class="type-tittle">路沿高度</span>
                <el-select v-model = 'height'>
                    <el-option v-for="height in heightList"
                               :key="Math.random()"
                               :value="height.val"
                               :label="height.text">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box" v-show = "lane_class === ('curb'||'lane')">
                <span class="type-tittle">直线|曲线</span>
                <el-select v-model = 'position'>
                    <el-option value="L" label="直线"></el-option>
                    <el-option value="C" label="曲线"></el-option>
                </el-select>
            </div>
            <div class="type-box" style="text-align: center">
                <el-radio-group>
                    <el-radio v-model="occluded" label="True" >被遮挡</el-radio>
                    <el-radio v-model="occluded" label="Break">断开</el-radio>
                    <el-radio v-model="occluded" label="False">无遮挡无断开</el-radio>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<script>
    import ElOption from "element-ui/packages/select/src/option";
    import ElRadioGroup from "element-ui/packages/radio/src/radio-group";
    import ElRadio from "element-ui/packages/radio/src/radio";

    export default {
        components: {
            ElRadio,
            ElRadioGroup,
            ElOption},
        name:'car-person',
        data(){
            return {
                True:'',
                Break:'',
                occluded:"True",//遮挡
                lane_class:'',//车道线种类
                id:'',//id
                laneClassList:[
                    {text:'车道线',val:'lane'},
                    {text:'路沿',val:'curb'},
                    {text:'停止线',val:'stopline'},
                    {text:'人行横道',val:'人行横道'},
                ],
                lanetype:'',//车道线类型
                laneTypeList:[
                    {text:'单车道线',val:'single'},
                    {text:'双车道线',val:'double'},
                    {text:'分叉线',val:'split'},
                    {text:'汇合线',val:'merge'},
                    {text:'三线',val:'tripple'},
                    {text:'点状线',val:'botts'},
                ],
                lanecolor:'',//车道线颜色
                laneColorList:[
                    {text:'白',val:'white'},
                    {text:'黄',val:'yellow'},
                    {text:'蓝',val:'blue'},
                    {text:'橙',val:'orange'},
                ],
                lanestyle:'',//车道线线形
                position:'',//车道线位置
                positionList:[
                    {text:'无',val:'None'},
                    {text:'左',val:'left'},
                    {text:'中',val:'middle'},
                    {text:'右',val:'right'},
                ],
                linetype:'',//车道线线型（直线|曲线）
                type:'',
                typeList:[
                    {text:'正面',val:'Front'},
                    {text:'背面',val:'Back'},
                ],
                height:'',
                heightList:[
                    {text:'低陷',val:'lower'},
                    {text:'平坦',val:'plain'},
                    {text:'略高',val:'middle'},
                    {text:'高',val:'high'},
                ],

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