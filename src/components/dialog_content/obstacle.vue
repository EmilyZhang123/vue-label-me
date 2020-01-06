<template>
    <div>
        <div class="dialog-title">
            <span>障碍物标注属性窗口</span>
        </div>
        <div class="dialog-content">
            <div>
                <span class="type-tittle">障碍物类别</span>
                <el-select v-model = 'name'  >
                    <el-option v-for = "name in nameList"
                               :key = "Math.random()"
                               :label = 'name.text'
                               :value = "name.val">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box">
                <span class="type-tittle" >路面类型</span>
                <el-select v-model = 'ground_type' >
                    <el-option v-for = "type in groundTypeList"
                               :key = "Math.random()"
                               :label = 'type.text'
                               :value = "type.val">
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
        name: "obstacle",
        data(){
            return {
                occluded:'',
                truncated:'',
                name:'',
                nameList:[
                    {val:'cementstonepier',text:'水泥石墩'},
                    {val:'conebucket',text: "锥桶"},
                    {val:'tripodwarnplate',text: "三角警示牌"},
                    {val:'autoliftbarrie',textr: "自动升降路障"},
                    {val:'isolationbarrier',text: "隔离栏"},
                    {val:'tyre',text: "轮胎"},
                    {val:'stone',text: "石头"},
                    {val:'box',text: "箱子"},
                    {val:'board',text: "木/纸板"},
                    {val:'bottle',text: "瓶子"},
                    {val:'plasticfoam',text: "塑料泡沫"},
                    {val:'tree',text: "树"},
                    {val:'roadsign',text: "道路指示牌"},
                    {val:'barricade',text: "拒马路障"},
                    {val:'cardoor',text: "车门"},
                    {val:'bonnet',text: "引擎盖"},
                    {val:'threadboard',text: "叶子板"},
                    {val:'animal',text: "动物"},
                    {val:'wirepole',text: "电线杆"},
                    {val:'nail',text: "钉子"},
                    {val:'Unknown',text: "其它"},
                ],
                ground_type:'',
                groundTypeList:[
                    {val:'1',text: "1_水泥"},
                    {val:'0',text:'0_沥青'}
                ],
            }
        }
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