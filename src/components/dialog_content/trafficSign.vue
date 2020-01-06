<template>
    <div>
        <div class="dialog-title">
            <span>交通标志属性窗口</span>
        </div>
        <div class="dialog-content">
            <div>
                <span class="type-tittle">类别</span>
                <el-select v-model = 'traffic_type' @change = 'traffic_type_change' >
                    <el-option v-for = "type in typeList"
                               :key = "Math.random()"
                               :label = 'type.text'
                               :value = "type.val">
                    </el-option>
                </el-select>
            </div>
            <div class="type-box">
                <span class="type-tittle">大类</span>
                 <el-select v-model = 'category' @change = 'category_change'>
                     <el-option v-for = "category in categoryList"
                                :key = "Math.random()"
                                :label = 'category.text'
                                :value = "category.val">
                     </el-option>
                </el-select>
            </div>
            <div class="type-box">
                <span class="type-tittle">小类</span>
                 <el-select v-model = 'name' >
                     <el-option v-for = "name in nameList"
                                :key = "Math.random()"
                                :label = 'name.text'
                                :value = "name.val">
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
    name:'traffic-sign',
    data(){
        return {
            occluded:false,
            truncated:false,
            traffic_type:'',
            typeList:[
                {text:'交通标志牌',val:'traffic_sign'},
                {text:'LED交通标志',val:'led_traffic_sign'},
            ],
            category:'',
            categoryList:[
                {text:'禁止类',val:'forbidden'},
                {text:'指示类',val:'go',},
            ],
            name:'',
            nameList:[

            ],
        }
    },
    computed:{
    },
    methods:{
        /**
         * @desc交通标志类别改变函数
         * @param  val {String} 改变后的交通标志类别
         * **/
        traffic_type_change(val){
            let arr = [];
            if(val === 'traffic_sign'){
                arr = [
                    {text:'禁止类',val:'forbidden'},
                    {text:'指示类',val:'go',},
                ]
            }else if (val === 'led_traffic_sign'){
                arr = [
                    {text:'禁止类',val:'forbidden'},
                ]
            }
            this.categoryList = [...arr];
            this.category = '';
        },
        /**
         * @desc大类改变函数
         * @param  val {String} 改变后的大类
         * **/
        category_change(val){

            this.name = '';
            let arr = [];
            if (this.traffic_type === 'traffic_sign'){
                if (val === 'forbidden'){
                    arr = [
                        {val: 'pnl',text: "禁止长时间停放"},
                        {val:'pn',text: "禁止车辆停放"},
                        {val:'pne',text: "禁止驶入"},
                        {val:'ps',text: "停车让行"},
                        {val:'pg',text: "让行"},
                        {val:'pl5',text: "限速5km/h"},
                        {val:'pl10',text: "限速10km/h"},
                        {val:'pl15',text: "限速15km/h"},
                        {val:'pl20',text: "限速20km/h"},
                        {val:'pl25',text: "限速25km/h"},
                        {val:'pl30',text: "限速30km/h"},
                        {val:'pl35',text: "限速35km/h"},
                        {val:'pl40',text: "限速40km/h"},
                        {val:'pl50',text: "限速50km/h"},
                        {val:'pl60',text: "限速60km/h"},
                        {val:'pl70',text: "限速70km/h"},
                        {val:'pl80',text: "限速80km/h"},
                        {val:'pl90',text: "限速90km/h"},
                        {val:'pl100',text: "限速100km/h"},
                        {val:'pl110',text: "限速110km/h"},
                        {val:'pl120',text: "限速120km/h"},
                        {val:'pr10',text: "解除限速10km/h"},
                        {val:'pr20',text: "解除限速20km/h"},
                        {val:'pr30',text: "解除限速30km/h"},
                        {val:'pr40',text: "解除限速40km/h"},
                        {val:'pr50',text: "解除限速50km/h"},
                        {val:'pr60',text: "解除限速60km/h"},
                        {val:'pr70',text: "解除限速70km/h"},
                        {val:'pr80',text: "解除限速80km/h"},
                        {val:'pr100',text: "解除限速100km/h"},
                        {val:'pm1_5',text: "限重1.5t"},
                        {val:'pm5',text: "限重5t"},
                        {val:'pm10',text: "限重10t"},
                        {val:'pm15',text: "限重15t"},
                        {val:'pm20',text: "限重20t"},
                        {val:'pm30',text: "限重30t"},
                        {val:'pm35',text: "限重35t"},
                        {val:'pm40',text: "限重40t"},
                        {val:'pm46',text: "限重46t"},
                        {val:'pm50',text: "限重50t"},
                        {val:'ph',text: "限高类"},
                        {val:'pw',text: "限宽类"},
                        {val:'unknown',text: "其他类"},
                    ];
                }else if (val === 'go'){
                    arr = [
                        {val:'il50',text: "最低限速50km/h"},
                        {val:'il60',text: "最低限速60km/h"},
                        {val:'il70',text: "最低限速70km/h"},
                        {val:'il80',text: "最低限速80km/h"},
                        {val:'il90',text: "最低限速90km/h"},
                        {val:'il100',text: "最低限速100km/h"},
                        {val:'il110',text: "最低限速110km/h"},
                        {val:'unknown',text: "其他类"},
                    ];
                }
            }else if (traffic_type === 'led_traffic_sign'){
               arr = [
                   {val:'pn',text: "禁止车辆停放"},
                   {val:'pne',text: "禁止驶入"},
                   {val:'ps',text: "停车让行"},
                   {val:'pl5',text: "限速5km/h"},
                   {val:'pl10',text: "限速10km/h"},
                   {val:'pl15',text: "限速15km/h"},
                   {val:'pl20',text: "限速20km/h"},
                   {val:'pl25',text: "限速25km/h"},
                   {val:'pl30',text: "限速30km/h"},
                   {val:'pl35',text: "限速35km/h"},
                   {val:'pl40',text: "限速40km/h"},
                   {val:'pl50',text: "限速50km/h"},
                   {val:'pl60',text: "限速60km/h"},
                   {val:'pl70',text: "限速70km/h"},
                   {val:'pl80',text: "限速80km/h"},
                   {val:'pl90',text: "限速90km/h"},
                   {val:'pl100',text: "限速100km/h"},
                   {val:'pl110',text: "限速110km/h"},
                   {val:'pl120',text: "限速120km/h"},
               ];
            }
            this.nameList = [...arr];
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