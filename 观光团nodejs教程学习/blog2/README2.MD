
###参考第一遍的实验，进行第二次实验

###使用默认的ejs引擎和默认的路由


1. 规划
   
   * 用户管理相关
     * 注册------新增
     * 登录------查询
     * 个人中心---查询
     * 修改个人信息---更新
     * session---保存session信息
   
   * 博客管理相关
     * 发表博客---新增
     * 查看博客---查询
     * 博客列表---查询
     * 修改博客---更新
     
   * 用户模型
     * 用户名（唯一）
     * 密码
     
   * 博客模型
     * 博客标题
     * 博客内容
     * 作者（关联用户表）
     * 发表时间
     
   * 其他
     * 使用bootstrap
     * 使用ajax进行post访问
     * post路由返回resJson
     * 使用mvc
        * routes 路由
        * models 模型
        * views  页面
        * controllers  控制器
     * public存放js/img/css
     * 使用mogodb/mongoose/connect-mongo
     * 使用express-session
     * config 存放数据库连接等配置文件
     
2. 开始
    
    * 拆分页面头部和尾部
    * 头部添加公共导航栏
    
    * 增加用户注册路由/用户注册页面/用户注册控制器