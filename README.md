---
title: Amaze UI autocomplete api
---

##方法功能介绍
通过数据字典中的内容，给予友好提示，点击或回车后自动完成填充，
文本框中输入.为通配符，一个点代表一个字符。

##在 Amaze UI 样式之后引入 autocomplete 样式（`dist` 目录下的 CSS）：
  Amaze UI autocomplete 依赖 Amaze UI 样式。
  ```html
  <link rel="stylesheet" href="path/to/amazeui.min.css"/>
  <link rel="stylesheet" href="path/to/amazeui.autocomplete.min.css"/>
  ```

##引入 autocomplete 插件（`dist` 目录下的 JS）：
  Amaze UI autocomplete 依赖 jquery 类库。
  ```html
  <script src="path/to/jquery.min.js"></script>
  <script src="path/to/amazeui.autocomplete.min.js"></script>
  ```

##使用方法
$('sel').autocomplete(options);
@$('sel'),为注意中类名之外的文本框对象
@option Object autocomplete接口对象 必选

##options对象属性参数介绍
@dictionary  Array 将要查询的数据字典 必选
@style Stirng 文本框的样式 可选 预选四种 'gray', 'green', 'blue', 'black' 默认: gray
@keySwitch Boolean 键盘操作开关，可操作键为up,down,回车 可选 默认: true
@mouseoverupSwitch Boolean 鼠标离开与进入显示隐藏开关 可选 默认: true

##demo 详见docs/demo.html docs/demo.js

##注意 text-search-box text-input text-list text-list-li-active 
			text-input-gray text-list-gray text-list-li-active-gray
			text-input-green text-list-green text-list-li-active-green
			text-input-blue text-list-blue text-list-li-active-blue
			text-input-black text-list-black text-list-li-active-black
    这些类名为插件内部使用类名，不能作为外部使用。
	
	
	
	