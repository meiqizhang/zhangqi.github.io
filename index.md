---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
          <div align="left">
            <ul class="categories-list">
              {% for cat in site.categories %}
                 <h3>&nbsp</h3>
                 {% capture show_tag %}{{cat[0]}}{% endcapture %}
                 {% if show_tag == "data_struct" %}
                    <a href="数据结构" class="title"> 数据结构 </a>
                 {% elsif show_tag == "raspberrypi" %}
                    <a href="树莓派" class="title"> 树莓派 </a>
                 {% else %}
                    <a href="{{ show_tag }}" class="title"> {{ show_tag }} </a>
                 {% endif %}
              {% endfor %}
            </ul>
          </div>
          <div>
          <h2>最新文章</h2>
          </div>
        </div>
      <div id="particles-js">
      </div>
    </div>
    <!-- 正文 -->
    <div>
    </div>
  </div>
</body>
