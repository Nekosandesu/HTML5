# HTML5布局慕课网站实例

2018/3/25--------

这是一个使用了HTML5新增标签进行了一个完整的网站布局实例，包括网站头部导航、正文、侧边栏、页脚等，主要用到的新标签有：header、nav、section、aside、article、footer。

主要用到的布局方式包括：
（1）
header中logo和导航的布局，使用的方法是分别:
logo：float: left;
导航：float: right;
导航内部a标签：float: left; display: block;
（2）
banner布局：
使用ul>li标签放置banner图（li不易被搜索引擎搜索到，用在banner中有利于保护banner图片的版权）
ul使用position: relative;为子元素的定位提供参照，li使用position: absolute结合top、right、bottom、left进行定位。上下居中显示可以使用top: 0; bottom: 0; margin: 0 auto;产生拔河效应使其居中。
（3）
正文两列布局：使用float布局。

