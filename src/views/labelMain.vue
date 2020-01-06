<template>
    <div>
        <div style="text-align: center">
            <el-button  :class="{'el-button--primary':category === item.val}"
                        @click="category = item.val"
                        v-for="item in categorylist"
                        style="margin-right: 20px">
                {{item.text}}
            </el-button>
            <el-button :disabled = 'ableEdit' class="el-button--primary" @click="edit">编辑</el-button>
            <el-button class="el-button--primary" @click="autoLabel">自动标注</el-button>
            <el-button class="el-button--primary" @click="exportImg">导出</el-button>
        </div>
       <!-- <el-row>
            <el-col :span = '6'>
                <b class = "pre-text">标记类型</b>
                <el-select v-model = 'category'>
                    <el-option v-for = "category in categorylist"
                               clearable
                               :key = "Math.random()"
                               :value = "category.val"
                               :label = "category.text" >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span = '6'>
                <b class = "pre-text">标记形状</b>
                <el-select v-model = 'shape'>
                    <el-option v-for = "shape in shapes"
                        clearable
                        :key = "Math.random()"
                        :value = "shape.val"
                        :label = "shape.text" >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span = '6'>
                <el-button @click = 'manualLabel'>手动标注</el-button>
            </el-col>
            <el-col :span = '6'>
                <el-button class="el-button&#45;&#45;primary" @click="autoLabel">自动标注</el-button>
            </el-col>
        </el-row>-->
        <br>
        <el-row :gutter="20">
            <el-col :span = '4'>
                <div style="max-height: 600px;overflow: auto;">
                    <div @click="getImgInfo(i)" v-for = "(img,i) in imgList" :class="['img-box',{'img-box-active':i === activeIndex}]">
                        <img v-if="i%3 === 0 " src = "../assets/img/kotei_9628.png" style="max-height: 200px;max-width: 100%">
                        <img v-if="i%3 === 1 " src = "../assets/img/kotei_9640.png" style="max-height: 200px;max-width: 100%">
                        <img v-if="i%3 === 2 " src = "../assets/img/kotei_10015.png" style="max-height: 200px;max-width: 100%">
                    </div>
                    <div style="text-align: center">
                        <a class="more-a" @click="getMore">点击加载更多</a>
                    </div>
                </div>
            </el-col>
            <el-col :span = '16'>
                <div v-loading="loading" id="canvas-box"
                     style="">
                    <div class="controlPanel">
                        <div v-for="item in shapes" :class="[shape === item.val ?'contro-item active': 'contro-item']" @click="handleShape(item.val)">
                        <!--<div v-for="item in shapes" :class="[shape === item.val ?'contro-item active': 'contro-item']" @click="shape = item.val,manualLabel()">-->
                            {{item.text}}
                        </div>

                        <!--<div :class="[tool===item.name ? 'contro-item active' : 'contro-item']"
                                v-for="(item,idx) in toolsArr" :key="idx"
                                @click="tool = item.name">
                            <i :class="'iconfont' + item.icon"></i>
                        </div>-->
                    </div>
                    <canvas id="label-canvas" style="display: block;width: 100%;height:100%"></canvas>
                    <img id="img-test" v-if="activeIndex%3 === 0 " src = "../assets/img/kotei_9628.png" style="max-width: 100%;display: none">
                    <img id="img-test" v-if="activeIndex%3 === 1 " src = "../assets/img/kotei_9640.png" style="max-width: 100%;display: none">
                    <img id="img-test" v-if="activeIndex%3 === 2 " src = "../assets/img/kotei_10015.png" style="max-width: 100%;display: none">
                </div>
            </el-col>
            <el-col :span = '4'>
                <div  class="result-box">
                    <div class="result-tittle" style="">标注结果</div>
                    <div class="result-content">
                        <div v-for="(val,key) in labelResult[activeIndex]" class="result-item">
                            <b>{{activeIndex}}-{{key}}</b>
                            <div class="result-sub-box"  v-for="(item,i) in val">
                                <div>
                                    <i>{{i}}{{item.shape}}</i>
                                </div>
                                <div class="result-sub-box-icon">
                                    <span title="编辑" @click="handleCommand('edit',item.id,key)" style="cursor: pointer" class="el-icon-edit-outline" ></span>
                                    <span style="padding-right: 10px" ></span>
                                    <span title="删除" @click="handleCommand('delete',item.id,key)" style="cursor: pointer" class="el-icon-delete" ></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
       <el-dialog
            :visible.sync="dialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="30%"
            :before-close="handleClose">
           <keep-alive>
               <component :is="currentDialog"></component>
           </keep-alive>
           <br>
            <div style = "text-align:center;">
                <el-button @click="sureLabel(false)">取 消</el-button>
                <el-button type="primary" @click="sureLabel(true)">确 定</el-button>
            </div>
            <br>
        </el-dialog>
        <el-dialog
            :visible.sync="imgDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="70%">
            <div style="padding: 20px">
                <img :src="exportBaseData" style="display: inline-block;max-width: 100%;max-height: 100%"/>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import defaultContent from '../components/dialog_content/defaultContent.vue'
import carPerson from '../components/dialog_content/carPerson.vue'
import trafficSign from '../components/dialog_content/trafficSign.vue'
import lane from '../components/dialog_content/lane.vue'
import obstacle from '../components/dialog_content/obstacle.vue'
import parkingSlot from '../components/dialog_content/parkingSlot.vue'
import faceCard from '../components/dialog_content/faceCard.vue'
import ElButton from "element-ui/packages/button/src/button";
export default {
    name:'labelMain',
    components:{
        ElButton,
        carPerson,
        trafficSign,
        defaultContent,
        lane,
        obstacle,
        parkingSlot,
        faceCard
    },
    data(){
        return {
            loading:true,
            fabricObj:null,
            fabricJson:{},
            drawingObject: null, //绘制对象
            moveCount: 1,
            mouseFrom:{},
            mouseTo:{},
            doDrawing:false,
            activeIndex:0,
            dialog:false,
            imgDialog:false,
            exportBaseData:'',
            ableEdit:false,
            page:1,
            pageSize:4,
            shape:'rectangle',
            shapes:[
                {text:'矩形',val:'rectangle'},
                {text:'圆形',val:'circle'},
                {text:'直线',val:'line'},
                {text:'梯形',val:'trapezoid'},
                {text:'点',val:'point'},
                {text:'折线',val:'linetrip'},
                {text:'多边形',val:'polygons'},
            ],
            category:'carperson',
            categorylist:[
                {text:'人车2.5D',val:'carperson'},
                {text:'交通标志',val:'traffic_sign'},
                {text:'车道线',val:'lane'},
                {text:'停车位',val:'parking_slot'},
                {text:'障碍物',val:'obstacle'},
                {text:'人脸车牌',val:'face_card'},
            ],
            imgList:[
                {index:0,url:''},
                {index:1,url:''},
                {index:2,url:''},
                {index:4,url:''},
            ],
            labelResult:{
                // 0:{'renche3.5':['juxing0']}
            },
        }
    },
    watch:{
        shape(val){
            // this.fabricObj.isDrawingMode = true;
        }
    },
    computed: {
        currentDialog(){
            let vueComponent = 'defaultContent';
            if (this.category === 'carperson'){
               vueComponent = 'carPerson';
            }else if (this.category === 'traffic_sign'){
                vueComponent = 'trafficSign'
            }else if (this.category === 'lane'){
                vueComponent = 'lane'
            }else if (this.category === 'parking_slot'){
                vueComponent = 'parkingSlot'
            }else if (this.category === 'obstacle'){
                vueComponent = 'obstacle'
            }else if (this.category === 'face_card'){
                vueComponent = 'faceCard'
            }
            return vueComponent
        }
    },
    beforeCreate(){
        this.loading = true;
    },
    mounted(){
        this.$nextTick(()=>{
            setTimeout(()=>{
                this.loading = false;
                this.fabricCanvas();
                this.fabricObjEvent();
            },500)
        });
    },
    methods: {
        /**
        * @desc 初始化fabric，添加图待标注图片到画布中。
        * */
        fabricCanvas(){
            let canvasBox  = document.getElementById('canvas-box');
            let canvasWidth = canvasBox.clientWidth||canvasBox.offsetWidth;
            let canvasHeight = canvasBox.clientHeight||canvasBox.offsetHeight;
            document.getElementById('label-canvas').width = canvasWidth;
            document.getElementById('label-canvas').height  = canvasHeight;

            this.fabricObj = new fabric.Canvas('label-canvas');
            this.fabricObj.selectable = false;
            this.fabricObj.selection = false;
            this.fabricObj.skipTargetFind = true;

            let imgElement  = document.getElementById('img-test');
            let imgWidth = imgElement.naturalWidth;
            let imgHeight = imgElement.naturalHeight;
            let scale ;
            // this.fabricObj.freeDrawingBrush.color = '#E34F51';
            // this.fabricObj.freeDrawingBrush.width = 2;

            if(imgWidth/imgHeight > canvasWidth/canvasHeight){
                scale = canvasWidth/imgWidth;
            }else {
                scale = canvasHeight/imgHeight
            }
            let img = new fabric.Image(imgElement,{
                scaleX:scale,
                scaleY:scale,
                zIndex:0,
                selectable:false,
            });

            this.fabricObj.add(
                img,
            );

        },
        /**
         * @desc事件监听
         * */
        fabricObjEvent(){
            // this.fabricObj.isDrawingMode = true;
            this.fabricObj.on({
                'mouse:down':(e)=>{
                    if (this.ableEdit){
                        return
                    }
                    this.doDrawing = true;
                    // e.preventDefault();
                    //鼠标按下
                    console.log('mouse down')
                    this.mouseFrom.x = e.pointer.x;
                    this.mouseFrom.y = e.pointer.y;
                    // this.doDrawing = true;
                },
                'mouse:move':(e)=>{
                    //鼠标移动
                    if (this.moveCount % 2 && !this.doDrawing) {
                        //减少绘制频率
                        return;
                    }
                    this.moveCount++;
                    this.mouseTo.x = e.pointer.x;
                    this.mouseTo.y = e.pointer.y;
                    this.drawing();
                },
                'mouse:up':(e)=>{
                    //鼠标抬起
                    this.moveCount = 1;
                    this.mouseTo.x = e.pointer.x;
                    this.mouseTo.y = e.pointer.y;
                    if(this.drawingObject && !this.ableEdit){
                        if(Object.keys(this.labelResult).includes(this.activeIndex+'')){
                            if (Object.keys(this.labelResult[this.activeIndex+'']).includes(this.category)){
                                console.log(this.labelResult[this.activeIndex+''][this.category].length)
                                this.drawingObject.set('id',this.labelResult[this.activeIndex+''][this.category].length);
                                this.labelResult[this.activeIndex+''][this.category].push(this.drawingObject)
                            }else {
                                this.drawingObject.set('id',0);
                                this.labelResult[this.activeIndex+''][this.category] = [this.drawingObject];
                            }
                            // this.doDrawing
                        }else {
                            this.labelResult[this.activeIndex+''] = {};
                            this.drawingObject.set('id',0);
                            this.labelResult[this.activeIndex+''][this.category] = [this.drawingObject]
                        }
                    }
                    console.log(this.labelResult)
                    this.drawingObject = null;
                    if (!this.ableEdit){
                        this.manualLabel();
                    }
                    this.doDrawing = false;
                },
                'object:moving': (e)=> {
                    //对象移动
                    // console.log( 'object:moving')
                    // console.log(e)
                    // e.target.opacity = 0.5;
                },
                'object:added': (e)=>{
                    //增加对象

                },
                'object:modified':(e)=> {
                    //修改对象
                    console.log( 'object:modified')
                    this.labelResult[this.activeIndex+''][this.category].forEach(item=>{
                        if (item.id === e.target.id){
                            item = e.target
                            console.log(e.target);
                            console.log(item);
                        }
                    });
                    console.log(this.labelResult)
                },
                'selection:created': (e)=>{
                    console.log('selection created')

                    e.target.set({
                        transparentCorners: false,
                        cornerColor: '#ff7a55',
                        cornerStrokeColor: '#ff7a55',
                        borderColor: 'red',
                        cornerSize: 12,
                        padding: 10,
                        cornerStyle: 'circle',
                        borderDashArray: [3, 3]
                    });
                }

            })
        },
        /**
         * @desc 点击图形开始画图
         * @param {String} shape 要绘制的形状
         * */
        handleShape(shape){
            this.shape = shape;
            this.ableEdit = false;
            this.fabricObj.isDrawingMode = false;
            this.fabricObj.selectable = false;
            this.fabricObj.selection = false;
            this.fabricObj.skipTargetFind = true;
        },
        drawing(){
            if(this.drawingObject) {
                this.fabricObj.remove(this.drawingObject)
            }
            let fabricNew = null;
            switch (this.shape){
                case 'polygons':
                    //绘制多边形
                    break;
                case 'rectangle':
                    //绘制矩形
                    let path =  "M " +
                        this.mouseFrom.x + " " +
                        this.mouseFrom.y + " L " +
                        this.mouseTo.x + " " +
                        this.mouseFrom.y + " L " +
                        this.mouseTo.x + " " +
                        this.mouseTo.y + " L " +
                        this.mouseFrom.x + " " +
                        this.mouseTo.y + " L " +
                        this.mouseFrom.x + " " +
                        this.mouseFrom.y + " z";
                    fabricNew = new fabric.Path(path, {
                        left: this.mouseFrom.x,
                        top: this.mouseFrom.y,
                        stroke: "#000",
                        strokeWidth: 2,
                        fill: "rgba(255, 255, 255, 0)"
                    });
                    break;
                case 'trapezoid':
                    //绘制梯形
                    break;
                case 'circle':
                    //绘制圆形
                    let radius = Math.sqrt((this.mouseTo.x - this.mouseFrom.x) * (this.mouseTo.x - this.mouseFrom.x) + (this.mouseTo.y - this.mouseFrom.y) * (this.mouseTo.y - this.mouseFrom.y)) / 2;
                    fabricNew = new fabric.Circle({
                        left: this.mouseFrom.x,
                        top: this.mouseFrom.y,
                        stroke: 'green',
                        fill: "rgba(255, 255, 255, 0)",
                        radius: radius,
                        strokeWidth: 2
                    });
                    break;
                case 'line':
                    //绘制点
                    fabricNew = new fabric.Line([this.mouseFrom.x,this.mouseFrom.y,this.mouseTo.x,this.mouseTo.y],{
                        stroke: '#ff1905',
                        strokeWidth: 2
                    });
                    break;
                case 'point':
                    //绘制点
                    break;
                case 'linetrip':
                    //绘制折线
                    fabricNew = new fabric.Line([this.mouseFrom.x,this.mouseFrom.y,this.mouseTo.x,this.mouseTo.y],{
                        stroke: '#ff1905',
                        strokeWidth: 2
                    });
                    break;
            }
            if (fabricNew){
                fabricNew.set('shape',this.shape);
                fabricNew.set('category',this.category);
                this.fabricObj.add(fabricNew);
                this.drawingObject = fabricNew;
            }
        },
        /**
         * @desc 导出已标注图片成base64格式
         * */
        exportImg(){
            let base64URl = this.fabricObj.toDataURL({
                formart: 'png',
                multiplier: 2
            });
            this.exportBaseData = base64URl;
            this.imgDialog = true;
            console.log(base64URl)
            console.log(this.fabricObj.toJSON())
        },
        /**
         * @desc 编辑事件
         * */
        edit(){
            this.ableEdit = true;
            this.doDrawing = false;
            this.shape = '';
            this.fabricObj.isDrawingMode = false;
            this.fabricObj.selectable = true;
            this.fabricObj.selection = true;
            this.fabricObj.skipTargetFind = false;
        },
        /*
       * @desc 模态框关闭事件
       * */
        handleClose(){
            this.dialog = false;
        },
        /*
       * @desc 获取更所图片
       * */
        getMore(){
            for (let i = 0;i<this.pageSize;i++){
                this.imgList.push({index:this.pageSize*this.page+i,url:''})
            }
            this.page++;
        },
        /*
        * @desc 获取当前图片信息
        * */
        getImgInfo(i){
            this.activeIndex = i;
            // this.fabricJson[i-1] = JSON.stringify(this.fabricObj);
            this.fabricObj.clear().renderAll();
            this.fabricCanvas();
            if (this.fabricJson.hasOwnProperty(i+'') && this.fabricJson[i+''] !== ''){
                // console.log(this.fabricJson[i+'']);
                this.fabricObj.loadFromJSON(this.fabricJson[i+''])
                this.fabricObj.renderAll();
            }
        },
        /**
        * @desc 自动标注
        * */
        autoLabel(){
            this.$router.push({
                name:'sketchpad'
            })
        },
        /**
         * @desc 手动标注
         * */
        manualLabel(){
            this.dialog = true;
        },
        /**
         * @desc 标注完后添加备注信息
         * @param flag {Boolean}   取消或确认
         * */
        sureLabel(flag){
            let type,shape;
            this.categorylist.map(item=>{
                if (item.val === this.category) type = item.text
            });
            this.shapes.map(item=>{
                if (item.val === this.shape) shape = item.text
            });
            if(flag){

            }else {
                let removeObj = this.labelResult[this.activeIndex][this.category].pop();
                this.fabricObj.remove(removeObj);
            }
            this.fabricJson[this.activeIndex] = JSON.stringify(this.fabricObj);
            this.dialog = false;
        },
        /**
         * @desc 编辑或删除当前图形
         * @param  {String} command 编辑或删除命令
         * @param  {Number} id 编辑或删除图形的id
         * @param  {String} category 当前类型
         * */
        handleCommand(command,id,category){
            let currentFabric,currentIndex ;
            this.labelResult[this.activeIndex][category].forEach((item,index) => {
                if (item.id === id){
                    currentFabric = item;
                    currentIndex = index;
                }
            });
            if (command === 'edit'){
                //编辑操作
                this.shape = '';
                this.ableEdit = true;
                this.fabricObj.selectable = true;
                this.fabricObj.selection = true;
                this.fabricObj.skipTargetFind = false;
                console.log(currentFabric);
                this.fabricObj.bringToFront(currentFabric);
                this.fabricObj.setActiveObject(currentFabric)

            }else if(command === 'delete'){
                //删除操作
                this.fabricObj.remove(currentFabric);
                this.labelResult[this.activeIndex][category].splice(currentIndex,1);
                this.$forceUpdate();
            }

        }

    },
}
</script>

<style scoped>
    .pre-text {
        padding-right:5px
    }
    .more-a{
        color: #0097dd;
        cursor: pointer;
        text-decoration: underline;
    }
    .img-box {
        border: 1px solid #dddeea;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .img-box:hover {
        box-shadow: 0 0 5px 5px #ccc;
    }
    .img-box-active {
        border-color: #0097dd;
    }
    .controlPanel {
        width: 100%;
        height: 62px;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        /*margin-bottom: 15px;*/
        border-bottom: 1px solid #dad7d9;
    }
    .controlPanel .contro-item{
        flex-basis: 100px;
        border-right: 1px solid #dad7d9;
        text-align: center;
        cursor: pointer;
        background: #fefefe;
        padding: 10px;
    }
    .contro-item.active {
        background: #409EFF;
        color: #fff;
    }
    .controlPanel .contro-item i{
        font-size: 38px;
        line-height: 62px;
    }
    .controlPanel .contro-item.active i{
        background: #409EFF;
        color: #fff;
        border-radius: 3px;
        font-size: 42px;

    }
    #canvas-box {
        border:1px solid #dddeea;min-height:500px;
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        /*margin: 0 20px;*/
    }
    .result-tittle {
        border-left: 4px solid #409EFF;
        padding-left: 10px;
        border-bottom: 1px solid #dddeea;
    }

    .result-content {
        padding: 10px;
    }
    .result-item {
        margin-bottom: 10px;
    }
    .result-sub-box {
        padding-left: 10px;
        display: flex;
        justify-content: space-between
    }
    .result-sub-box:hover {
        color: #409EFF;
    }
    .result-sub-box:hover .result-sub-box-icon{
    }
</style>


