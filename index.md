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
                {% if {{ cat[0] }} == "data_struct" %} 
                  <a href="数据结构" class="title"><font color="red">数据结构</font></a>
                {% else %}
                  <a href={{ cat[0] }}} class="title"><font color="red">{{ cat[0] }}</font></a>
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
