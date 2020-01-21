---
layout: default
---


<body>
  <div class="index-wrapper">

    <div class="aside">
      <div class="info-card">
        <h2>show info</h2>
          <div align="left">
            <ul class="categories-list">
              {% for cat in site.categories %}
                <li><font size="3" color="red"> {{ cat[0] }} </font></li>
              {% endfor %}
            </ul>
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
