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
                  {% assign foo = {{ cat[0] }} %}
                  <li>11x{{ foo }}</li>
                  <li>22{{ foo }}</li>
                  {% if foo == "data_struct" %}
                    <a href="数据结构" class="title"> 数据结构 </a>
                  {% else %}
                    <a href="{{ cat[0] }}" class="title"> {{ cat[0] }} </a>
                  {% endif %}
                <h2>34</h2>
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
