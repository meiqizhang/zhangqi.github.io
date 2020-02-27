---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
          <div id="divcss5"><img src="/images/header.png" width="64px" /></div>

          <div align="left">
            <ul class="categories-list">
              {% assign index = 0 %}
              {% for cat in site.categories %}

                {% if index == 0 %}
                  {% assign index = 1 %}
                  <br/><br/>

                {% else %}
                  <h3>&nbsp;</h3>
                {% endif %}

                {% capture show_tag %}{{cat[0]}}{% endcapture %}
                {% if show_tag == "data_struct" %}
                   <a href="数据结构" class="title"> 数据结构 </a>
                {% elsif show_tag == "raspberrypi" %}
                   <a href="树莓派" class="title"> 树莓派实验室 </a>
                {% elsif show_tag == "network" %}
                   <a href="计算机网络" class="title"> 计算机网络 </a>
                {% elsif show_tag == "Distributed-OS" %}
                   <a href="分布式系统" class="title"> 分布式系统 </a>
                {% elsif show_tag == "CPP" %}
                   <a href="C++" class="title"> C++ </a>
				{% elsif show_tag == "cv" %}
                   <a href="图像识别" class="title"> 图像识别 </a>
                {% elsif show_tag == "others" %}
                   <a href="知识盲区" class="title"> 知识盲区 </a>
                {% else %}
                   <a href="{{ show_tag }}" class="title"> {{ show_tag }} </a>
                {% endif %}
              {% endfor %}
            </ul>
          </div>
          <div class="new-article">
          <br/><br/>
          <h2>最新文章</h2>
          </div>
        </div>
      <div id="particles-js">
      </div>
    </div>
    <!-- 正文 -->
    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.posts %}
            <li>
              <a href="{{ post.url }}" class="title">{{ post.title }}</a>
              <div class="title-desc">{{ post.description }}</div>
            </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</body>
