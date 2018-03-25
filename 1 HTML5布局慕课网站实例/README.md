# HTML5布局慕课网站实例

2018/3/25--------<br>

这是一个使用了HTML5新增标签进行了一个完整的网站布局实例，包括网站头部导航、正文、侧边栏、页脚等，主要用到的新标签有：header、nav、section、aside、article、footer。<br>

主要用到的布局方式包括：<br>
（1）<br>
header中logo和导航的布局，使用的方法是分别:<br>
logo：float: left;<br>
导航：float: right;<br>
导航内部a标签：float: left; display: block;<br>
（2）<br>
banner布局：<br>
使用ul>li标签放置banner图（li不易被搜索引擎搜索到，用在banner中有利于保护banner图片的版权）
ul使用position: relative;为子元素的定位提供参照，li使用position: absolute结合top、right、bottom、left进行定位。上下居中显示可以使用top: 0; bottom: 0; margin: 0 auto;产生拔河效应使其居中。<br>
（3）<br>
正文两列布局：使用float布局。<br>

