---
layout:     post
title:      Redis中3种特殊的数据类型（BitMap、Geo和HyperLogLog
category:   redis
tags:       ['数据类型']
description: Reids 在 Web 应用的开发中使用非常广泛，几乎所有的后端技术都会有涉及到 Redis 的使用。Redis 种除了常见的字符串 String、字典 Hash、列表 List、集合 Set、有序集合 SortedSet 等等之外，还有一些不常用的数据类型，这里着重介绍三个。下面话不多说了，来一起看看详细的介绍吧。
---

<div id="content">
                        <p><span style="color: #ff0000"><strong>前言</strong></span></p>
<p>Reids 在 Web 应用的开发中使用非常广泛，几乎所有的后端技术都会有涉及到 Redis 的使用。Redis 种除了常见的字符串 String、字典 Hash、列表 List、集合 Set、有序集合 SortedSet 等等之外，还有一些不常用的数据类型，这里着重介绍三个。下面话不多说了，来一起看看详细的介绍吧。<br>
</p>
<p><span style="color: #ff0000"><strong>BitMap</strong></span><br>
</p>
<p>BitMap 就是通过一个 bit 位来表示某个元素对应的值或者状态, 其中的 key 就是对应元素本身，实际上底层也是通过对字符串的操作来实现。Redis 从 2.2 版本之后新增了setbit, getbit, bitcount 等几个 bitmap 相关命令。虽然是新命令，但是本身都是对字符串的操作，我们先来看看语法：<br>
</p>
<div class="jb51code">
<div><div id="highlighter_448962" class="syntaxhighlighter  sql"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="sql plain">SETBIT </code><code class="sql keyword">key</code> <code class="sql plain">offset value</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>其中 offset 必须是数字，value 只能是 0 或者 1，咋一看感觉没啥用处，我们先来看看 bitmap 的具体表示，当我们使用命令 setbit key (0,2,5,9,12) 1后，它的具体表示为：</p>
<p>
</p><table>
  <thead>
    <tr>
      <th>byte</th>
      <th>bit0</th>
      <th>bit1</th>
      <th>bit2</th>
      <th>bit3</th>
      <th>bit4</th>
      <th>bit5</th>
      <th>bit6</th>
      <th>bit7</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>byte0</td>
      <td>1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>byte1</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p></p>
<p>可以看出 bit 的默认值是 0，那么 BitMap 在实际开发的运用呢？这里举一个例子：储存用户在线状态。这里只需要一个 key，然后把用户 ID 作为 offset，如果在线就设置为 1，不在线就设置为 0。实例代码：<br>
</p>
<div class="jb51code">
<div><div id="highlighter_903952" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div><div class="line number3 index2 alt2">3</div><div class="line number4 index3 alt1">4</div><div class="line number5 index4 alt2">5</div><div class="line number6 index5 alt1">6</div><div class="line number7 index6 alt2">7</div><div class="line number8 index7 alt1">8</div><div class="line number9 index8 alt2">9</div><div class="line number10 index9 alt1">10</div><div class="line number11 index10 alt2">11</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">//设置在线状态</code></div><div class="line number2 index1 alt1"><code class="plain plain">$redis-&gt;setBit('online', $uid, 1);</code></div><div class="line number3 index2 alt2">&nbsp;</div><div class="line number4 index3 alt1"><code class="plain plain">//设置离线状态</code></div><div class="line number5 index4 alt2"><code class="plain plain">$redis-&gt;setBit('online', $uid, 0);</code></div><div class="line number6 index5 alt1">&nbsp;</div><div class="line number7 index6 alt2"><code class="plain plain">//获取状态</code></div><div class="line number8 index7 alt1"><code class="plain plain">$isOnline = $redis-&gt;getBit('online', $uid);</code></div><div class="line number9 index8 alt2">&nbsp;</div><div class="line number10 index9 alt1"><code class="plain plain">//获取在线人数</code></div><div class="line number11 index10 alt2"><code class="plain plain">$isOnline = $redis-&gt;bitCount('online');</code></div></div></td></tr></tbody></table></div></div>
</div>
<p><span style="color: #ff0000"><strong>Geo</strong></span><br>
</p>
<p>Redis 的 GEO 特性在 Redis 3.2 版本中推出， 这个功能可以将用户给定的地理位置信息储存起来， 并对这些信息进行操作。GEO 的数据结构总共有六个命令：geoadd、geopos、geodist、georadius、georadiusbymember、gethash,这里着重讲解几个。</p>
<p><strong>1.GEOADD</strong></p>
<div class="jb51code">
<div><div id="highlighter_204524" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">GEOADD key longitude latitude member [longitude latitude member ...]</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>将给定的空间元素（纬度、经度、名字）添加到指定的键里面。 这些数据会以有序集合的形式被储存在键里面， 从而使得像 GEORADIUS 和 GEORADIUSBYMEMBER 这样的命令可以在之后通过位置查询取得这些元素。例子：<br>
</p>
<div class="jb51code">
<div><div id="highlighter_750265" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"</code></div><div class="line number2 index1 alt1"><code class="plain plain">(integer) 2</code></div></div></td></tr></tbody></table></div></div>
</div>
<p><strong>2.GEOPOS</strong><br>
</p>
<div class="jb51code">
<div><div id="highlighter_133143" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">GEOPOS key member [member ...]</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>从键里面返回所有给定位置元素的位置（经度和纬度），例子：<br>
</p>
<div class="jb51code">
<div><div id="highlighter_958" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div><div class="line number3 index2 alt2">3</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; GEOPOS Sicily Palermo Catania NonExisting</code></div><div class="line number2 index1 alt1"><code class="plain plain">1) 1) "13.361389338970184"</code></div><div class="line number3 index2 alt2"><code class="plain spaces">&nbsp;</code><code class="plain plain">2) "38.115556395496299"</code></div></div></td></tr></tbody></table></div></div>
</div>
<p><strong>3.GEODIST</strong><br>
</p>
<div class="jb51code">
<div><div id="highlighter_261903" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">GEODIST key member1 member2 [unit]</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>返回两个给定位置之间的距离。如果两个位置之间的其中一个不存在， 那么命令返回空值。指定单位的参数 unit 必须是以下单位的其中一个：（默认为m）<br>
</p>
<blockquote>
<p>m&nbsp;&nbsp; 表示单位为米。<br>
km&nbsp; 表示单位为千米。<br>
mi&nbsp; 表示单位为英里。<br>
ft&nbsp; 表示单位为英尺。<br>
</p>
</blockquote>
<div class="jb51code">
<div><div id="highlighter_21164" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; GEODIST Sicily Palermo Catania</code></div><div class="line number2 index1 alt1"><code class="plain plain">"166274.15156960039"</code></div></div></td></tr></tbody></table></div></div>
</div>
<p><strong>4.GEORADIUS</strong><br>
</p>
<div class="jb51code">
<div><div id="highlighter_161989" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [ASC|DESC] [COUNT count]</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>以给定的经纬度为中心， 返回键包含的位置元素当中， 与中心的距离不超过给定最大距离的所有位置元素。距离单位和上面的一致，其中后面的选项：<br>
</p>
<blockquote>
<p>WITHDIST： 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。距离的单位和用户给定的范围单位保持一致。<br>
WITHCOORD： 将位置元素的经度和维度也一并返回。<br>
WITHHASH： 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。这个选项主要用于底层应用或者调试， 实际中的作用并不大。<br>
</p>
</blockquote>
<div class="jb51code">
<div><div id="highlighter_327892" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div><div class="line number3 index2 alt2">3</div><div class="line number4 index3 alt1">4</div><div class="line number5 index4 alt2">5</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; GEORADIUS Sicily 15 37 200 km WITHDIST</code></div><div class="line number2 index1 alt1"><code class="plain plain">1) 1) "Palermo"</code></div><div class="line number3 index2 alt2"><code class="plain spaces">&nbsp;</code><code class="plain plain">2) "190.4424"</code></div><div class="line number4 index3 alt1"><code class="plain plain">2) 1) "Catania"</code></div><div class="line number5 index4 alt2"><code class="plain spaces">&nbsp;</code><code class="plain plain">2) "56.4413"</code></div></div></td></tr></tbody></table></div></div>
</div>
<p><span style="color: #ff0000"><strong>HyperLogLog</strong></span><br>
</p>
<p>Redis 的基数统计，这个结构可以非常省内存的去统计各种计数，比如注册 IP 数、每日访问 IP 数、页面实时UV）、在线用户数等。但是它也有局限性，就是只能统计数量，而没办法去知道具体的内容是什么。<br>
</p>
<p>当然用集合也可以解决这个问题。但是一个大型的网站，每天 IP 比如有 100 万，粗算一个 IP 消耗 15 字节，那么 100 万个 IP 就是 15M。而 HyperLogLog 在 Redis 中每个键占用的内容都是 12K，理论存储近似接近 2^64 个值，不管存储的内容是什么，它一个基于基数估算的算法，只能比较准确的估算出基数，可以使用少量固定的内存去存储并识别集合中的唯一元素。而且这个估算的基数并不一定准确，是一个带有 0.81% 标准错误的近似值。<br>
</p>
<p>这个数据结构的命令有三个：PFADD、PFCOUNT、PFMERGE<br>
</p>
<p>1.PFADD<br>
</p>
<div class="jb51code">
<div><div id="highlighter_395734" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div><div class="line number3 index2 alt2">3</div><div class="line number4 index3 alt1">4</div><div class="line number5 index4 alt2">5</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; PFADD databases "Redis" "MongoDB" "MySQL"</code></div><div class="line number2 index1 alt1"><code class="plain plain">(integer) 1</code></div><div class="line number3 index2 alt2">&nbsp;</div><div class="line number4 index3 alt1"><code class="plain plain">redis&gt; PFADD databases "Redis"&nbsp; # Redis 已经存在，不必对估计数量进行更新</code></div><div class="line number5 index4 alt2"><code class="plain plain">(integer) 0</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>2.PFCOUNT<br>
</p>
<div class="jb51code">
<div><div id="highlighter_141308" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; PFCOUNT databases</code></div><div class="line number2 index1 alt1"><code class="plain plain">(integer) 3</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>3.PFMERGE<br>
</p>
<div class="jb51code">
<div><div id="highlighter_196276" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">PFMERGE destkey sourcekey [sourcekey ...]</code></div></div></td></tr></tbody></table></div></div>
</div>
<p>将多个 HyperLogLog 合并为一个 HyperLogLog， 合并后的 HyperLogLog 的基数接近于所有输入 HyperLogLog 的可见集合的并集。合并得出的 HyperLogLog 会被储存在 destkey 键里面， 如果该键并不存在，那么命令在执行之前， 会先为该键创建一个空的 HyperLogLog 。<br>
</p>
<div class="jb51code">
<div><div id="highlighter_953207" class="syntaxhighlighter  plain"><div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div><div class="line number3 index2 alt2">3</div><div class="line number4 index3 alt1">4</div><div class="line number5 index4 alt2">5</div><div class="line number6 index5 alt1">6</div><div class="line number7 index6 alt2">7</div><div class="line number8 index7 alt1">8</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2"><code class="plain plain">redis&gt; PFADD nosql "Redis" "MongoDB" "Memcached"</code></div><div class="line number2 index1 alt1"><code class="plain plain">(integer) 1</code></div><div class="line number3 index2 alt2"><code class="plain plain">redis&gt; PFADD RDBMS "MySQL" "MSSQL" "PostgreSQL"</code></div><div class="line number4 index3 alt1"><code class="plain plain">(integer) 1</code></div><div class="line number5 index4 alt2"><code class="plain plain">redis&gt; PFMERGE databases nosql RDBMS</code></div><div class="line number6 index5 alt1"><code class="plain plain">OK</code></div><div class="line number7 index6 alt2"><code class="plain plain">redis&gt; PFCOUNT databases</code></div><div class="line number8 index7 alt1"><code class="plain plain">(integer) 6</code></div></div></td></tr></tbody></table></div></div>
</div>
<p><span style="color: #ff0000"><strong>总结</strong></span></p>
<p>以上就是这篇文章的全部内容了，希望本文的内容对大家的学习或者工作具有一定的参考学习价值，如果有疑问大家可以留言交流，谢谢大家对脚本之家的支持。</p>
                        
<div class="art_xg">
<h4>您可能感兴趣的文章:</h4><ul><li><a href="/article/157183.htm" title="Redis的5种数据类型与常用命令讲解" target="_blank">Redis的5种数据类型与常用命令讲解</a></li><li><a href="/article/139649.htm" title="Redis安装及基本数据类型" target="_blank">Redis安装及基本数据类型</a></li><li><a href="/article/128394.htm" title="Jedis对redis的五大类型操作代码详解" target="_blank">Jedis对redis的五大类型操作代码详解</a></li><li><a href="/article/122364.htm" title="redis字符串类型_动力节点Java学院整理" target="_blank">redis字符串类型_动力节点Java学院整理</a></li><li><a href="/article/122363.htm" title="redis数据类型_动力节点Java学院整理" target="_blank">redis数据类型_动力节点Java学院整理</a></li><li><a href="/article/122357.htm" title="Redis有序集合类型的操作_动力节点Java学院整理" target="_blank">Redis有序集合类型的操作_动力节点Java学院整理</a></li><li><a href="/article/122259.htm" title="redis列表类型_动力节点Java学院整理" target="_blank">redis列表类型_动力节点Java学院整理</a></li><li><a href="/article/122080.htm" title="redis集合类型_动力节点Java学院整理" target="_blank">redis集合类型_动力节点Java学院整理</a></li><li><a href="/article/122072.htm" title="redis哈希类型_动力节点Java学院整理" target="_blank">redis哈希类型_动力节点Java学院整理</a></li><li><a href="/article/120364.htm" title="Redis 数据类型的详解" target="_blank">Redis 数据类型的详解</a></li><li><a href="/article/110146.htm" title="Redis中五种数据类型简单操作" target="_blank">Redis中五种数据类型简单操作</a></li><li><a href="/article/93718.htm" title="Redis集合类型的常用命令小结" target="_blank">Redis集合类型的常用命令小结</a></li><li><a href="/article/93666.htm" title="Redis列表类型的常用命令小结" target="_blank">Redis列表类型的常用命令小结</a></li><li><a href="/article/93593.htm" title="Redis中散列类型的常用命令小结" target="_blank">Redis中散列类型的常用命令小结</a></li><li><a href="/article/93569.htm" title="Redis字符串类型的常用命令小结" target="_blank">Redis字符串类型的常用命令小结</a></li><li><a href="/article/93531.htm" title="Redis有序集合类型的常用命令小结" target="_blank">Redis有序集合类型的常用命令小结</a></li><li><a href="/article/88364.htm" title="Redis02 使用Redis数据库(String类型)全面解析" target="_blank">Redis02 使用Redis数据库(String类型)全面解析</a></li><li><a href="/article/179826.htm" title="redis基本类型和使用方法详解" target="_blank">redis基本类型和使用方法详解</a></li></ul>
</div>
<p class="tip">如您对本文有所疑义或者对本文内容提供补充建议，请联系小编<a href="http://wpa.qq.com/msgrd?v=3&amp;uin=2998481778&amp;site=jb51net&amp;menu=yes" target="_blank"><img border="0" src="https://pub.idqqimg.com/qconn/wpa/button/button_111.gif" alt="点击这里给我发消息" title="点击这里给我发消息"></a>，本站会保留修改者版权</p><div class="lbd_bot clearfix">
<script async="" src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-6384567588307613" data-ad-slot="3921475131" data-adsbygoogle-status="done"><ins id="aswift_0_expand" style="display:inline-table;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visible;width:728px;background-color:transparent;"><ins id="aswift_0_anchor" style="display:block;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visible;width:728px;background-color:transparent;"><iframe width="728" height="90" frameborder="0" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" allowfullscreen="true" onload="var i=this.id,s=window.google_iframe_oncopy,H=s&amp;&amp;s.handlers,h=H&amp;&amp;H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&amp;&amp;d&amp;&amp;(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}" id="aswift_0" name="aswift_0" style="left:0;position:absolute;top:0;border:0px;width:728px;height:90px;"></iframe></ins></ins></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

                        </div>
                    <p>原文链接：https://juejin.im/post/5aa72131518825556a7211af</p><div class="jb51ewm"><div class="fl"><img src="//files.jb51.net/skin/2018/images/jb51ewm.png"></div><div class="fr"><p>微信公众号搜索 “ <span>脚本之家</span> ” ，选择关注</p><p>程序猿的那些事、送书等活动等着你</p></div></div></div>