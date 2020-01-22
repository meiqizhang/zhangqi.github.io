---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">

        <div align="left">
          {% for post in site.categories.leetcode %}
            {% if post.tags == "dp" %}
              {%assign posts = post | concat : post %}
            {% endif %}
          {% endfor %}
          
          {% for post in posts %}
            <a href="{{ post.url }}" class="title">{{ post.title }}</a>
          {% endfor %}
        </div>

      </div>
        <div id="particles-js"></div>
      </div>

    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.leetcode %}
          <li>
            <a href="{{ post.url }}" class="title">{{ post.title }}</a>
            <div class="title-desc">{{ post.description }}</div>
          </li>
        {% endfor %}
      </ul>
    </div>
    
  </div>
</body>
