---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        {% assign TAG = "子序列" %}
        <div align="left">
          {% for post in site.categories.leetcode %}
            {% for t in post.tags %}
              {% if t == TAG %}
                <h3>&nbsp;</h3>
                <a href="{{ post.url }}" class="title">{{ post.title | replace : "leetcode-", "" }}</a>
                {% break %}
              {% endif %}
            {% endfor %}
          {% endfor %}
        </div>

      </div>
        <div id="particles-js"></div>
      </div>

    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.leetcode %}
        {% endfor %}
        
        {% for post in site.categories.leetcode %}
          {% for t in post.tags %}
            {% if t == TAG %}
              <li>
                <a href="{{ post.url }}" class="title">{{ post.title }}</a>
                <div class="title-desc">{{ post.description }}</div>
              </li>
              {% break %}
              {% endif %}
            {% endfor %}
          {% endfor %}
      </ul>
    </div>
    
  </div>
</body>
