---
layout: default
---


<body>
  <div class="index-wrapper">

    <div class="aside">
      <div class="info-card">
        <h2>show info</h2>
          <div>
            <ul class="categories-list">
              {% for cat in site.categories %}
                <h2> {{ cat[0] }} </h2>
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
