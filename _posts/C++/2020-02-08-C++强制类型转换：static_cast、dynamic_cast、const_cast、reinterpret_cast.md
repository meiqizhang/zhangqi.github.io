---
layout:     post
title:      C++强制类型转换：static_cast、dynamic_cast、const_cast、reinterpret_cast
category:   CPP
tags:       ['类型转换']
description:  c++除了能使用c语言的强制类型转换外，还新增了四种强制类型转换：static_cast、dynamic_cast、const_cast、reinterpret_cast，主要运用于继承关系类间的强制转化，语法为：
---
<div id="cnblogs_post_body" class="blogpost-body ">
    <h1><span style="font-size: 14pt;"><strong>1. c强制转换与c++强制转换</strong></span></h1>
<p>&nbsp;<span style="font-size: 16px;">c语言强制类型转换主要用于基础的数据类型间的转换，语法为：</span></p>
<div class="cnblogs_code">
<pre>(type-id)expression<span style="color: #008000;">//</span><span style="color: #008000;">转换格式1</span>
<span style="color: #000000;">
type</span>-id(expression)<span style="color: #008000;">//</span><span style="color: #008000;">转换格式2</span></pre>
</div>
<p><span style="font-size: 16px;">c++除了能使用c语言的强制类型转换外，还新增了四种强制类型转换：static_cast、dynamic_cast、const_cast、reinterpret_cast，主要运用于继承关系类间的强制转化，语法为：</span></p>
<div class="cnblogs_code">
<pre>static_cast&lt;new_type&gt;<span style="color: #000000;">      (expression)
dynamic_cast</span>&lt;new_type&gt;<span style="color: #000000;">     (expression) 
const_cast</span>&lt;new_type&gt;<span style="color: #000000;">       (expression) 
reinterpret_cast</span>&lt;new_type&gt; (expression)</pre>
</div>
<p><span style="font-size: 16px;"><em>备注：new_type为目标数据类型，expression为原始数据类型变量或者表达式。</em></span></p>
<p><span style="font-size: 16px;">《Effective C++》中将c语言强制类型转换称为<strong>旧式转型</strong>，c++强制类型转换称为<strong>新式转型</strong>。</span></p>
<h1><span style="font-size: 14pt;"><strong>2.&nbsp;static_cast、dynamic_cast、const_cast、reinterpret_cast</strong></span></h1>
<ul>
<li>
<h2><span style="font-size: 16px;"><strong>&nbsp;static_cast</strong></span></h2>
</li>
</ul>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">static_cast相当于传统的C语言里的强制转换，该运算符把expression转换为new_type类型，用来强迫隐式转换，例如non-const对象转为const对象，编译时检查，用于非多态的转换，可以转换指针及其他，但<em><span style="color: #ff0000;">没有运行时类型检查来保证转换的安全性</span></em>。它主要有如下几种用法：</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">①用于类层次结构中基类（父类）和派生类（子类）之间指针或引用的转换。</span></div>
<div class="para" style="margin-left: 60px;"><span style="font-size: 16px;"><em><span style="color: #ff0000;">进行上行转换（把派生类的指针或引用转换成基类表示）是<strong>安全</strong>的；</span></em></span></div>
<div class="para" style="margin-left: 60px;"><span style="font-size: 16px;"><em><span style="color: #ff0000;">进行下行转换（把基类指针或引用转换成派生类表示）时，由于没有动态类型检查，所以是<strong>不安全</strong>的。</span></em></span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">②用于基本数据类型之间的转换，如把int转换成char，把int转换成enum。这种转换的安全性也要开发人员来保证。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">③把空指针转换成目标类型的空指针。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">④把任何类型的表达式转换成void类型。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">注意：static_cast不能转换掉expression的const、volatile、或者__unaligned属性。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">&nbsp;</span></div>
<div class="para" style="margin-left: 30px; text-align: left;"><span style="font-size: 16px;">基本类型数据转换举例如下：</span></div>
<div class="para" style="margin-left: 30px; text-align: left;">
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre><span style="color: #0000ff;">char</span> a = <span style="color: #800000;">'</span><span style="color: #800000;">a</span><span style="color: #800000;">'</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">int</span> b = static_cast&lt;<span style="color: #0000ff;">char</span>&gt;(a);<span style="color: #008000;">//</span><span style="color: #008000;">正确，将char型数据转换成int型数据</span>

<span style="color: #0000ff;">double</span> *c = <span style="color: #0000ff;">new</span> <span style="color: #0000ff;">double</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">void</span> *d = static_cast&lt;<span style="color: #0000ff;">void</span>*&gt;(c);<span style="color: #008000;">//</span><span style="color: #008000;">正确，将double指针转换成void指针</span>

<span style="color: #0000ff;">int</span> e = <span style="color: #800080;">10</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">const</span> <span style="color: #0000ff;">int</span> f = static_cast&lt;<span style="color: #0000ff;">const</span> <span style="color: #0000ff;">int</span>&gt;(e);<span style="color: #008000;">//</span><span style="color: #008000;">正确，将int型数据转换成const int型数据</span>

<span style="color: #0000ff;">const</span> <span style="color: #0000ff;">int</span> g = <span style="color: #800080;">20</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">int</span> *h = static_cast&lt;<span style="color: #0000ff;">int*</span>&gt;(&amp;g);<span style="color: #008000;">//<span style="color: #ff0000;">编译</span></span><span style="color: #008000;"><span style="color: #ff0000;">错误</span>，static_cast不能转换掉g的const属性<br><br></span></pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
</div>
<div class="para" style="margin-left: 30px; text-align: left;">&nbsp;</div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">类上行和下行转换：</span></div>
<div class="para" style="margin-left: 30px;">
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre><span style="color: #0000ff;">if</span>(Derived *dp = static_cast&lt;Derived *&gt;(bp)){<span style="color: #008000;">//</span><span style="color: #ff0000;">下行转换是不安全的
  </span><span style="color: #008000;">//</span><span style="color: #008000;">使用dp指向的Derived对象  </span>
<span style="color: #000000;">}
</span><span style="color: #0000ff;">else</span><span style="color: #000000;">{
  </span><span style="color: #008000;">//</span><span style="color: #008000;">使用bp指向的Base对象  </span>
<span style="color: #000000;">}

</span><span style="color: #0000ff;">if</span>(Base*bp = static_cast&lt;Derived *&gt;(dp)){<span style="color: #008000;">//</span><span style="color: #008000;">上行转换是安全的
  </span><span style="color: #008000;">//</span><span style="color: #008000;">使用bp指向的Derived对象  </span>
<span style="color: #000000;">}
</span><span style="color: #0000ff;">else</span><span style="color: #000000;">{
  </span><span style="color: #008000;">//</span><span style="color: #008000;">使用dp指向的Base对象  </span>
}</pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
<p>&nbsp;</p>
</div>
<ul>
<li>
<h2><span style="font-size: 16px;"><strong>dynamic_cast</strong></span></h2>
</li>
</ul>
<div class="cnblogs_code">
<pre>dynamic_cast&lt;type*&gt;<span style="color: #000000;">(e)
dynamic_cast</span>&lt;type&amp;&gt;<span style="color: #000000;">(e)
dynamic_cast</span>&lt;type&amp;&amp;&gt;(e)</pre>
</div>
<p>　　<span style="font-size: 14pt;"><span style="font-size: 16px;">t</span><span style="font-size: 16px;">ype必须是一个类类型，在第一种形式中，type必须是一个有效的指针，在第二种形式中，type必须是一个左值，在第三种形式中，type必须是一个右值。在上面所有形式中，e的类型必须符合以下三个条件中的任何一个：e的类型是是目标类型type的公有派生类、e的类型是目标type的共有基类或者e的类型就是目标type的的类型。如果一条dynamic_cast语句的转换目标是指针类型并且失败了，则结果为0。如果转换目标是引用类型并且失败了，则dynamic_cast运算符将抛出一个std::bad_cast异常(该异常定义在typeinfo标准库头文件中)。e也可以是一个空指针，结果是所需类型的空指针。</span></span></p>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">dynamic_cast主要用于类层次间的上行转换和下行转换，还可以用于类之间的交叉转换（cross cast）。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">在类层次间进行上行转换时，dynamic_cast和static_cast的效果是一样的；</span></div>
<div class="para" style="margin-left: 30px;"><span style="color: #ff0000; font-size: 16px;"><em>在进行下行转换时，dynamic_cast具有类型检查的功能，比static_cast更安全。dynamic_cast是唯一无法由旧式语法执行的动作，也是唯一可能耗费重大运行成本的转型动作。</em></span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">（1）指针类型</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">举例，Base为包含至少一个虚函数的基类，Derived是Base的共有派生类，如果有一个指向Base的指针bp，我们可以在运行时将它转换成指向Derived的指针，代码如下：</span></div>
<div class="para" style="margin-left: 30px;">
<div class="cnblogs_code">
<pre><span style="color: #0000ff;">if</span>(Derived *dp = dynamic_cast&lt;Derived *&gt;<span style="color: #000000;">(bp)){
  </span><span style="color: #008000;">//</span><span style="color: #008000;">使用dp指向的Derived对象  </span>
<span style="color: #000000;">}
</span><span style="color: #0000ff;">else</span><span style="color: #000000;">{
  </span><span style="color: #008000;">//</span><span style="color: #008000;">使用bp指向的Base对象  </span>
}</pre>
</div>
<p><span style="font-size: 16px;">值得注意的是，在上述代码中，if语句中定义了dp，这样做的好处是可以在一个操作中同时完成类型转换和条件检查两项任务。</span></p>
<p><span style="font-size: 16px;">（2）引用类型</span></p>
<p><span style="font-size: 16px;">因为不存在所谓空引用，所以引用类型的dynamic_cast转换与指针类型不同，在引用转换失败时，会抛出std::bad_cast异常，该异常定义在头文件typeinfo中。</span></p>
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre><span style="color: #0000ff;">void</span> f(<span style="color: #0000ff;">const</span> Base &amp;<span style="color: #000000;">b){
 </span><span style="color: #0000ff;">try</span><span style="color: #000000;">{
   </span><span style="color: #0000ff;">const</span> Derived &amp;d = dynamic_cast&lt;<span style="color: #0000ff;">const</span> Base &amp;&gt;<span style="color: #000000;">(b);  
   </span><span style="color: #008000;">//</span><span style="color: #008000;">使用b引用的Derived对象</span>
<span style="color: #000000;"> }
 </span><span style="color: #0000ff;">catch</span><span style="color: #000000;">(std::bad_cast){
   </span><span style="color: #008000;">//</span><span style="color: #008000;">处理类型转换失败的情况</span>
<span style="color: #000000;"> }
}</span></pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
<p>&nbsp;</p>
</div>
<ul>
<li>
<h2><span style="font-size: 16px;"><strong>const_cast</strong></span></h2>
</li>
</ul>
<p style="margin-left: 30px;"><span style="font-size: 16px;">const_cast，用于修改类型的const或volatile属性。&nbsp;</span></p>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">该运算符用来修改类型的const(唯一有此能力的C++-style转型操作符)或volatile属性。除了const 或volatile修饰之外， new_type和expression的类型是一样的。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">①常量指针被转化成非常量的指针，并且仍然指向原来的对象；</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">②常量引用被转换成非常量的引用，并且仍然指向原来的对象；</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">③const_cast一般用于修改底指针。如const char *p形式。</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">&nbsp;</span></div>
<div class="para" style="margin-left: 30px;"><span style="font-size: 16px;">举例转换如下：</span></div>
<div class="para" style="margin-left: 30px;">
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre><span style="color: #0000ff;">const</span> <span style="color: #0000ff;">int</span> g = <span style="color: #800080;">20</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">int</span> *h = const_cast&lt;<span style="color: #0000ff;">int</span>*&gt;(&amp;g);<span style="color: #008000;">//</span><span style="color: #008000;">去掉const常量const属性</span>

<span style="color: #0000ff;">const</span> <span style="color: #0000ff;">int</span> g = <span style="color: #800080;">20</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">int</span> &amp;h = const_cast&lt;<span style="color: #0000ff;">int</span> &amp;&gt;(g);<span style="color: #008000;">//</span><span style="color: #008000;">去掉const引用const属性</span>

 <span style="color: #0000ff;">const</span> <span style="color: #0000ff;">char</span> *g = <span style="color: #800000;">"</span><span style="color: #800000;">hello</span><span style="color: #800000;">"</span><span style="color: #000000;">;
</span><span style="color: #0000ff;">char</span> *h = const_cast&lt;<span style="color: #0000ff;">char</span> *&gt;(g);<span style="color: #008000;">//</span><span style="color: #008000;">去掉const指针const属性</span></pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
<p>&nbsp;</p>
</div>
<ul>
<li>
<h2><span style="font-size: 16px;"><strong>reinterpret_cast</strong></span></h2>
</li>
</ul>
<p style="margin-left: 30px;"><span style="font-size: 16px;">new_type必须是一个指针、引用、算术类型、函数指针或者成员指针。它可以把一个指针转换成一个整数，也可以把一个整数转换成一个指针（先把一个指针转换成一个整数，再把该整数转换成原类型的指针，还可以得到原先的指针值）。</span></p>
<p style="margin-left: 30px;"><span style="color: #ff0000; font-size: 16px;"><em>reinterpret_cast意图执行低级转型，实际动作（及结果）可能取决于编辑器，这也就表示它<strong>不可移植</strong>。</em></span></p>
<p><span style="font-size: 16px;">　　举一个错误使用reintepret_cast例子，将整数类型转换成函数指针后，vc++在执行过程中会报"...中的 0xxxxxxxxx 处有未经处理的异常: 0xC0000005: Access violation"错误：</span></p>
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre>#include &lt;iostream&gt;
<span style="color: #0000ff;">using</span> <span style="color: #0000ff;">namespace</span><span style="color: #000000;"> std;
</span><span style="color: #0000ff;">int</span> output(<span style="color: #0000ff;">int</span><span style="color: #000000;"> p){
    cout </span>&lt;&lt; p &lt;&lt;<span style="color: #000000;">endl;<br>　　return 0;
}

typedef </span><span style="color: #0000ff;">int</span> (*test_func)(<span style="color: #0000ff;">int</span> );<span style="color: #008000;">//</span><span style="color: #008000;">定义函数指针test_func</span>
<span style="color: #0000ff;">int</span><span style="color: #000000;"> main(){
    </span><span style="color: #0000ff;">int</span> p = <span style="color: #800080;">10</span><span style="color: #000000;">;
    test_func fun1 </span>=<span style="color: #000000;"> output;
    fun1(p);</span><span style="color: #008000;">//</span><span style="color: #008000;">正确</span>
    test_func fun2 = reinterpret_cast&lt;test_func&gt;(&amp;<span style="color: #000000;">p);
    fun2(p);</span><span style="color: #008000;">//<span style="color: #ff0000;">...</span><span style="color: #ff0000;">处有未经处理的异常: 0xC0000005: Access violation</span></span>
    <span style="color: #0000ff;">return</span> <span style="color: #800080;">0</span><span style="color: #000000;">;
}</span></pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
<p style="margin-left: 30px;"><span style="font-size: 16px;"><a href="http://publib.boulder.ibm.com/infocenter/compbgpl/v9v111/index.jsp?topic=/com.ibm.xlcpp9.bg.doc/language_ref/keyword_reinterpret_cast.htm">IBM的C++指南</a>、C++之父<a href="http://www2.research.att.com/~bs/bs_faq2.html#static-cast">Bjarne Stroustrup的FAQ网页</a>和<a href="http://msdn.microsoft.com/en-us/library/e0w9f63b%28VS.80%29.aspx">MSDN的Visual C++</a>也都指出：<span style="color: #ff0000;"><em><span class="quotation">错误的使用reinterpret_cast很容易导致程序的不安全，只有将转换后的类型值转换回到其原始类型，这样才是正确使用reinterpret_cast方式。</span></em></span></span></p>
<div><span style="font-size: 16px;">　　MSDN中也提到了，实际中可将reinterpret_cast应用到哈希函数中，如下（64位系统中需将unsigned int修改为unsigned long）：</span><br>
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre><span style="color: #008000;">//</span><span style="color: #008000;"> expre_reinterpret_cast_Operator.cpp
</span><span style="color: #008000;">//</span><span style="color: #008000;"> compile with: /EHsc</span>
#include &lt;iostream&gt;

<span style="color: #008000;">//</span><span style="color: #008000;"> Returns a hash code based on an address</span>
unsigned <span style="color: #0000ff;">short</span> Hash( <span style="color: #0000ff;">void</span> *<span style="color: #000000;">p ) {
   unsigned </span><span style="color: #0000ff;">int</span> val = reinterpret_cast&lt;unsigned <span style="color: #0000ff;">int</span>&gt;<span style="color: #000000;">( p );
   </span><span style="color: #0000ff;">return</span> ( unsigned <span style="color: #0000ff;">short</span> )( val ^ (val &gt;&gt; <span style="color: #800080;">16</span><span style="color: #000000;">));
}

</span><span style="color: #0000ff;">using</span> <span style="color: #0000ff;">namespace</span><span style="color: #000000;"> std;
</span><span style="color: #0000ff;">int</span><span style="color: #000000;"> main() {
   </span><span style="color: #0000ff;">int</span> a[<span style="color: #800080;">20</span><span style="color: #000000;">];
   </span><span style="color: #0000ff;">for</span> ( <span style="color: #0000ff;">int</span> i = <span style="color: #800080;">0</span>; i &lt; <span style="color: #800080;">20</span>; i++<span style="color: #000000;"> )
      cout </span>&lt;&lt; Hash( a + i ) &lt;&lt;<span style="color: #000000;"> endl;
}</span></pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
<p>&nbsp;</p>
</div>
<div>　　<span style="font-size: 16px;">另外，static_cast和reinterpret_cast的区别主要在于多重继承，比如</span></div>
<div class="para">&nbsp;</div>
<div class="para">
<div class="cnblogs_code"><div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div>
<pre><span style="color: #0000ff;">class</span><span style="color: #000000;"> A {
    </span><span style="color: #0000ff;">public</span><span style="color: #000000;">:
    </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> m_a;
};
 
</span><span style="color: #0000ff;">class</span><span style="color: #000000;"> B {
    </span><span style="color: #0000ff;">public</span><span style="color: #000000;">:
    </span><span style="color: #0000ff;">int</span><span style="color: #000000;"> m_b;
};
 
</span><span style="color: #0000ff;">class</span> C : <span style="color: #0000ff;">public</span> A, <span style="color: #0000ff;">public</span> B {};</pre>
<div class="cnblogs_code_toolbar"><span class="cnblogs_code_copy"><a href="javascript:void(0);" onclick="copyCnblogsCode(this)" title="复制代码"><img src="//common.cnblogs.com/images/copycode.gif" alt="复制代码"></a></span></div></div>
</div>
<div class="para">　　<span style="font-size: 16px;">那么对于以下代码：</span></div>
<div class="para">　　
<div class="cnblogs_code">
<pre><span style="color: #000000;">C c;
printf(</span><span style="color: #800000;">"</span><span style="color: #800000;">%p, %p, %p</span><span style="color: #800000;">"</span>, &amp;c, reinterpret_cast&lt;B*&gt;(&amp;c), static_cast &lt;B*&gt;(&amp;c));</pre>
</div>
<p>&nbsp;</p>
</div>
<div>
<div id="highlighter_279956" class="syntaxhighlighter  cpp">&nbsp;<span style="font-size: 14pt;">　<span style="font-size: 16px;">前两个的输出值是相同的，最后一个则会在原基础上偏移4个字节，这是因为static_cast计算了父子类指针转换的偏移量，并将之转换到正确的地址（c里面有m_a,m_b，转换为B*指针后指到m_b处），而reinterpret_cast却不会做这一层转换。</span></span></div>
</div>
<div class="para"><span style="font-size: 16px;">　因此, 你需要谨慎使用 reinterpret_cast。</span></div>
<div class="para">&nbsp;</div>
<h1><span style="font-size: 14pt;"><strong>3. c++强制转换注意事项</strong></span></h1>
<ul>
<li><span style="font-size: 16px;">新式转换较旧式转换更受欢迎。原因有二，一是新式转型较易辨别，能简化“找出类型系统在哪个地方被破坏”的过程；二是各转型动作的目标愈窄化，编译器愈能诊断出错误的运用。</span></li>
<li><span style="font-size: 16px;">尽量少使用转型操作，尤其是dynamic_cast，耗时较高，会导致性能的下降，尽量使用其他方法替代。</span></li>
</ul>
<p>&nbsp;</p>
<p>参考资料：</p>
<p>a):http://en.cppreference.com/w/cpp/language/static_cast</p>
<p>b):http://en.cppreference.com/w/cpp/language/dynamic_cast</p>
<p>c):http://en.cppreference.com/w/cpp/language/const_cast</p>
<p>d):http://en.cppreference.com/w/cpp/language/reinterpret_cast</p>
<p>e):《Effective C++》条款27:尽量少做转型动作</p>
<p>f): 百度百科</p>
<p>g) 《C++ Primer》</p>
</div>