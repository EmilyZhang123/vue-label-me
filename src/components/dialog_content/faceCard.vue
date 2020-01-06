<template>
    <div>
        <div class="dialog-title">
            <span>隐私处理属性窗口</span>
        </div>
        <div class="dialog-content">
            <div>
                <span class="type-tittle">类别</span>
                <el-select v-model = 'name'  >
                    <el-option value="face" label="人脸"></el-option>
                    <el-option value="card" label="车牌"></el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    import ElOption from "element-ui/packages/select/src/option";

    export default {
        components: {ElOption},
        name: "face-card",
        data(){
            return {
                name:'',
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