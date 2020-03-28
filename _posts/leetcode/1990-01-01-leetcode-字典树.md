---
layout: default
---

<body>
  {% assign TAG = "子数组" %}
  {% for post in site.categories.leetcode %}
    {% for t in post.tags %}
      {% if t == TAG %}
        {% assign titles = titles | append: post.title | append: "__zhqi__" %}
      {% endif %}
    {% endfor %}
  {% endfor %}
  {% assign titles = titles | split: "__zhqi__" | sort %}

  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <div id="divcss5"><img src="/images/header.png" width="64px" /><br/><br/></div>

        <div align="left">
          {% for title in titles %}
            {% for post in site.categories.leetcode %}
              {% if title == post.title %}
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
        {% for title in titles %}
          {% for post in site.categories.leetcode %}
            {% if title == post.title %}
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
