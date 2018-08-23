<?php include 'header.php' ?>
<body>
  <div id="app" v-cloak>
    <!-- 头部 -->
    <header>
      <div class="nav">
        <div class="menu" @click='showMenu = true'>
          <i class="iconfont icon-menu"></i>
        </div>
        <div class="title">
          <!-- <img src="t.png"> -->
          TODO
        </div>
        <!-- 搜索 -->
        <!-- <div class="search">
          <input v-model='searchValue' @keyup.enter='search'></input>
          <i
            @click='clearSearchValue'
            :class="['iconfont', searchValue ? 'icon-delete' : 'icon-search']"></i>
          <div>
            
          </div>
        </div> -->
        <!-- 用户 -->
        <div>
          <div 
            v-if='!username' 
            class="login" 
            @click='showLogin = true'>
            Login
          </div>
          <div
            class='username'
            v-else>
            <span class="username-text">{{ username }}<span class="arrow"></span></span>
            <span class="username-icon"><i class="iconfont icon-caidan08"></i></span>
            <div class="userMenu">
              <span class="triangle"></span>
              <ul>
                <li class="phone-username">{{ username }}</li>
                <li @click='clearStorage'>删除本地记录</li>
                <li @click='logout'>退出登录</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 登录框 -->
      <todo-dialog @hidedialog='showLogin = false' v-if='showLogin'>
        <login-dialog 
          @login='userAction' 
          @reg='userAction'>
        </login-dialog>
      </todo-dialog>
    </header>
    
    <!-- TODO应用主体 -->
    <todo-app :todos='todos' class='todo-app'>
      <!-- 编辑框 -->
      <todo-dialog @hidedialog='showDialog = false' v-if='showDialog'>
        <list-dialog
          :listdata='listData'
          @cancel='cancel'
          @submitlist='submitList'
          :todo='listData'>
        </list-dialog>
      </todo-dialog>
      
      <!-- 警告和加载 -->
      <div class="messageDiv" v-show='warning || waiting'>
        <div class="warning" v-show='warning'>
          {{ warningText }}
        </div>

        <div class="waiting" v-show='waiting'>
          <i class="iconfont icon-loading"></i>
        </div>
      </div>
      
      <!-- 提示文字 -->
      <div class="tips" :style="tipsData.style" v-show='tipsData.show'>
        <span>{{tipsData.words}}</span>
      </div>
      
      <!-- 遮罩 -->
      <div class="grey" v-show='showMenu' @click='showMenu = false'></div>
      <!-- 清单列表 -->
      <div :class="['todo-title', 'hideLeft', showMenu ? 'showLeft' : '']">
        <div class="todo-title-header">清单列表</div>
        <ul>
          <li 
            is='todo-title' 
            v-for='(todo, index) in todos' 
            :todo='todo'
            :title='title'
            :index='index'
            @touch='touchStart'
            @handleListTitle='handleListTitle'
            @editlist='editList'
            @deletelist='deleteList'>
          </li>
        </ul>
        <div class="buttonMenu">
          <button 
            class="addNewList"
            @click='addNewList'
            @mouseenter='showTips("新增清单", $event)'>
            <i class="iconfont icon-add"></i>
          </button>
          <button v-if='username'
            class="exportFile"
            @click='exportFile'
            @mouseenter='showTips("导出json文件", $event)'>
            <i class="iconfont icon-cloud-down"></i>
          </button>
          <label v-if='username'
            class="importFile" 
            for="file"
            @mouseenter='showTips("导入json文件", $event)'>
            <i class="iconfont icon-cloud-up"></i>
          </label>
          <input hidden
            ref='fileInput' 
            @change='importFile($event)' 
            id="file" 
            type="file"></input>
        </div>
      </div>
      
      <!-- 事件列表 -->
      <template slot='content' slot-scope='content'>
        <list
          :title='title'
          :count='content.index'
          :lists='content.todo.lists'
          :inputval='inputVal'
          :editval='editVal'
          :choosetab='chooseTab'
          :editindex='editIndex'
          @changeStatus='changeStatus'
          @edititem='editItem'
          @deleteitem='deleteItem'
          @addnewitem='addNewItem'
          @confirmedit='confirmEdit'>
          <!-- 状态选择 -->
          <todo-tab
            :choosetab='chooseTab'
            :tabtitles='tabTitles'
            @tabchange='tabChange'>
          </todo-tab>
        </list>
      </template>
      <div class="nothing" v-if='todos.length == 0'>还没有清单呢</div>
    </todo-app>

    <!-- copyright -->
    <footer>
      <div class="footer-content">
        <div>Copyright © 2018 <a href="https://amenging.cn">Ameng.</a> <a href="https://github.com/amenging"><i class="iconfont icon-GitHub"></i></a> </div>
        <div>
        </div>
      </div>
    </footer>
  </div>
<?php include 'footer.php' ?>