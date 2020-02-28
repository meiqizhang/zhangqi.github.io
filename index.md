---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
          <div id="divcss5"><img src="/images/header.png" /></div>

          <div align="left">
            <ul class="categories-list">
              {% for cat in site.categories %}
                {% assign categories = categories | append: cat[0] | append: "__zhqi__" %}
              {% endfor }
              {{ categories }}
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
