---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <div id="divcss5"><img src="/images/header.png" width="64px" /></div>

        {% assign TAG = "数组" %}
        <div align="left">
          {% assign index = 0 %}
          {% for post in site.categories.leetcode %}
            {% for t in post.tags %}
              {% if t == TAG %}
                {% if index == 0 %}
                  {% assign index = 1 %}
                  <br/><br/>
                {% else %}
                  <h3>&nbsp;</h3>
                {% endif %}
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
