<template>
    <div class="permission-container">
        <div class="permission-wrapper">
            <div class="filterBox">
                <el-input placeholder="请输入角色名称" v-model="name" class="searchName">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button type="primary" @click="searchSubmit">查询</el-button>
                <el-button type="primary" class="fl-right" @click="handleAddRole">新增</el-button>
            </div>
            <el-table
                    v-loading="listLoading"
                    :data="rolesList"
                    border
                    fit
                    highlight-current-row
                    style="width: 100%;"
                    class="tableBox"
            >
                <el-table-column label="角色编号" prop="key"  align="center"  >
                    <template slot-scope="scope">
                        {{scope.row.key}}
                    </template>
                </el-table-column>
                <el-table-column label="角色名称" prop="name"  align="center" ></el-table-column>
                <el-table-column label="角色说明" prop="description"  align="center" > </el-table-column>
                <el-table-column label="角色状态"   align="center"  >
                    <template slot-scope="scope">
                       {{scope.row.state=='1'?"有效":"关闭"}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" prop="time"   align="center"  ></el-table-column>
                <el-table-column label="操作"   align="center"  >
                    <template slot-scope="scope">
                        <el-button type="text" @click="handleEdit(scope)">编辑权限</el-button>
                        <el-button type="text" class="color-red" @click="handleDelete(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        <!--模态框-->
        <el-dialog :visible.sync="dialogVisible" title="权限组信息" :before-close="dialogClose" class="dialogPermission">

            <el-form :model="role" label-width="70px" label-position="left">
                <el-row :gutter="50">
                    <el-col :span="12">
                        <el-form-item label="权限类型">
                            <el-radio v-model="role.type" label="1">新增</el-radio>
                            <el-radio v-model="role.type" label="2">学校的统一认证</el-radio>
                        </el-form-item>
                        <el-form-item v-show="role.type==1" label="角色名称">
                            <el-input v-model="role.name" placeholder="请输入角色名称" />
                        </el-form-item>
                        <el-form-item v-show="role.type==1" label="角色说明">
                            <el-input v-model="role.description" placeholder="角色说明非必填" />
                        </el-form-item>

                    </el-col>
                    <el-col :span="12" class="el-tree-col">
                        <el-tree
                                ref="tree"
                                :check-strictly="checkStrictly"
                                :data="routesData"
                                :props="defaultProps"
                                show-checkbox
                                node-key="path"
                                class="permission-tree"
                                :default-expanded-keys="schoolOpen"
                        />
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button  @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmRole">确定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    import Pagination from '@/components/Pagination'

    import path from 'path'
    import { deepClone ,parseTime} from '@/utils'
    import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
    const defaultRole = {
        key: '',
        name: '',
        description: '',
        routes: [],
        state:1,
        type:'1',
        time:""
    };
    export default {
        name: "permission",
        components: { Pagination },
        data(){
            return{
                name:"",//查询名称
                rolesList:[
                    // {key:"5452001",name:"超级管理",description:"1356667778",state:true,time:"2019-01 00:00:00"},
                        ],
                listLoading:false,
                total:0,//总数
                listQuery:{
                    page:1,
                    limit:10,
                },
                dialogVisible:false,//模态框是否显示
                role: Object.assign({}, defaultRole),
                routes: [],
                schoolOpen:[],//学校权限展开的项
                schoolRoutes:[
                    {
                        id:1,
                        path:'/taizhouxuexiao',
                        title:"泰州学校",
                        children:[
                            {
                                path:'/tuanwei',
                                title:'团委',
                                children:[
                                    {
                                        path:'/tuanwei/xuanchuanbu',
                                        title:'宣传部'
                                    },
                                    {
                                        path:'/tuanwei/shijianbu',
                                        title:'实践部'
                                    },
                                    {
                                        path:'/tuanwei/wentibu',
                                        title:'文体部'
                                    },
                                    {
                                        path:'/tuanwei/xueshengshetuan',
                                        title:'学生社团'
                                    },
                                ]
                            },
                            {
                                path:'/zhaoshengban',
                                title:'招生办'
                            },
                            {
                                path:'/jiaoyuguanlike',
                                title:'教育管理科'
                            },
                            {
                                path:'/xueshengzizhuzhongxin',
                                title:'学生资助中心'
                            },
                            {
                                path:'/xinlijiankangzhongxin',
                                title:'心理健康中心'
                            },
                        ]
                    }
                ],
                routesData:[],
                dialogType: 'new',
                checkStrictly: false,
                defaultProps: {
                    // children: 'children',
                    label: 'title'
                }
            }
        },
        // computed: {
        //     routesData() {
        //         return this.routes
        //     },
        //
        // },
        watch:{
            routes(val){
                this.routesData = val;
            },
            'role.type'(val){
                if(val == 1){
                   this.routesData = this.routes;
                }else{
                   this.routesData = this.schoolRoutes;
                }
            }
        },
        created() {
            // Mock: get all routes and roles list from server
            this.getRoutes();
            this.getRoles();
        },
        methods:{
            // 查询
            async searchSubmit(){
                const res = await getRoles();
                if(this.name ==''){
                    this.rolesList = res.data;
                }else{
                    var arr =[];
                    var __this = this;
                    res.data.forEach(function(item){
                       if(item.name.indexOf(__this.name)>-1){
                           arr.push(item);
                       }
                    });
                    this.rolesList = arr;
                }

            },
            // 获取列表
            getList() {
                this.listLoading = true;
                setTimeout(() => {
                    // this.rolesList = this.rolesList.concat(this.rolesList);
                    // this.total = 100;
                    this.listLoading = false;
                },  1000);
                // fetchList(this.listQuery).then(response => {
                //     this.rolesList = response.data.items
                //     this.total = response.data.total
                //
                //     // Just to simulate the time of the request
                //     setTimeout(() => {
                //         this.list = response.data.items
                //         this.total = response.data.total
                //         this.listLoading = false
                //     }, 1.5 * 1000)
                // });
            },
            //关闭模态框
            dialogClose(){
                this.dialogVisible = false;
            },
            //获取路由列表
            async getRoutes() {
                const res = await getRoutes();
                this.serviceRoutes = res.data;
                this.routes = this.generateRoutes(res.data);
                console.log(this.routes);
            },
            // 获取权限列表
            async getRoles() {
                const res = await getRoles();
                this.rolesList = res.data;
                // console.log(res)
            },

            // Reshape the routes structure so that it looks the same as the sidebar
            generateRoutes(routes, basePath = '/') {
                const res = []

                for (let route of routes) {
                    // skip some route
                    if (route.hidden) { continue }

                    const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

                    if (route.children && onlyOneShowingChild && !route.alwaysShow) {
                        route = onlyOneShowingChild
                    }

                    const data = {
                        path: path.resolve(basePath, route.path),
                        title: route.meta && route.meta.title

                    }

                    // recursive child routes
                    if (route.children) {
                        data.children = this.generateRoutes(route.children, data.path)
                    }
                    res.push(data)
                }
                return res
            },
            generateArr(routes) {
                let data = []
                routes.forEach(route => {
                    data.push(route)
                    if (route.children) {
                        const temp = this.generateArr(route.children)
                        if (temp.length > 0) {
                            data = [...data, ...temp]
                        }
                    }
                })
                return data
            },
            handleAddRole() {
                this.role = Object.assign({}, defaultRole)
                if (this.$refs.tree) {
                    this.$refs.tree.setCheckedNodes([])
                }
                this.dialogType = 'new'
                this.dialogVisible = true
            },
            handleEdit(scope) {
                this.dialogType = 'edit';
                this.dialogVisible = true;
                this.checkStrictly = true;
                this.role = deepClone(scope.row);
                this.$nextTick(() => {
                    const routes = this.generateRoutes(this.role.routes)
                    this.$refs.tree.setCheckedNodes(this.generateArr(routes))
                    // set checked state of a node not affects its father and child nodes
                    this.checkStrictly = false
                })
            },
            handleDelete({ $index, row }) {
                this.$confirm('确定删除'+row.name+'?', '权限信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async() => {
                        await deleteRole(row.key);
                        this.rolesList.splice($index, 1);
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(err => { console.error(err) })
            },
            generateTree(routes, basePath = '/', checkedKeys) {
                const res = [];
                for (const route of routes) {
                    const routePath = path.resolve(basePath, route.path);

                    // recursive child routes
                    if (route.children) {
                        route.children = this.generateTree(route.children, routePath, checkedKeys)
                    }

                    if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
                        res.push(route)
                    }
                }
                return res
            },
            async confirmRole() {
                const isEdit = this.dialogType === 'edit'

                const checkedKeys = this.$refs.tree.getCheckedKeys()
                this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

                if (isEdit) {
                    await updateRole(this.role.key, this.role);
                    for (let index = 0; index < this.rolesList.length; index++) {
                        if (this.rolesList[index].key === this.role.key) {
                            this.rolesList.splice(index, 1, Object.assign({}, this.role))
                            break
                        }
                    }
                } else {
                    const { data } = await addRole(this.role);
                    this.role.key = this.rolesList.length+1;
                    this.role.time = parseTime(new Date().getTime());
                    this.rolesList.push(this.role);
                }

                const { description, key, name } = this.role;
                this.dialogVisible = false
                this.$notify({
                    title: 'Success',
                    dangerouslyUseHTMLString: true,
                    message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
                    type: 'success'
                })
            },
            // reference: src/view/layout/components/Sidebar/SidebarItem.vue
            onlyOneShowingChild(children = [], parent) {
                let onlyOneChild = null
                const showingChildren = children.filter(item => !item.hidden)

                // When there is only one child route, the child route is displayed by default
                if (showingChildren.length === 1) {
                    onlyOneChild = showingChildren[0]
                    onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
                    return onlyOneChild
                }

                // Show parent if there are no child route to display
                if (showingChildren.length === 0) {
                    onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                    return onlyOneChild
                }

                return false
            }
        }
    }
</script>

<style lang="scss" scoped>
.permission-container{
    padding:15px 25px;
    .permission-wrapper{
        padding:15px 25px;
        border:1px solid #cccccc;
    }
    /deep/ .searchName{
        width:300px;
        margin-right:30px;
        .el-input__inner{
            height: 35px;
            background:rgba(238, 238, 238, 1);
            border:none;
        }
        .el-input__prefix{
            font-size:16px;
            color: rgb(82,82,82);
            top:-2px;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
            color: #999;
            font-size: 14px;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color: #999;
            font-size: 14px;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
            color: #999;
            font-size: 14px;
        }

    }
    .filterBox{
        /deep/.el-button{
            padding:8px 15px;
            min-width:100px;
            font-weight:500;
        }
    }
    /deep/.tableBox{
        margin-top:15px;
        /*color: inherit;*/
        /*th{color:#303133;}*/
        /*td{*/
             /*padding:0;*/
         /*}*/
    }
    /deep/.pagination-container{
        margin: 0;
        border: 1px solid #dfe6ec;
        border-top: none;
    }
    /deep/.el-dialog__wrapper.dialogPermission{
        .el-dialog__header{
            background-color:rgba(81, 81, 81, 1);
            .el-dialog__title{
                color: #ffffff;
            }
            .el-dialog__close{
                font-size:20px;
            }
        }
        .el-dialog__body{
            padding:30px 40px;
        }
        .el-dialog__footer{
            background:rgba(240, 243, 250, 1);
            .el-button{padding:8px 20px;}
        }
        .el-form-item{
            margin-bottom:8px;
        }
        .el-input__inner{
            height: 35px;
            border-radius: 0;
        }
        .permission-tree{
            max-height: 400px;
            overflow: auto;
            padding:15px 0;
            border: 1px solid rgba(204, 204, 204, 1);
        }
    }
}
</style>