---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">

        <div align="left">
          {% for post in site.categories.leetcode %}
            {% assign tags = tags | concat : post.tags | uniq %}
          {% endfor %}
          
          {% for post in site.categories.leetcode %}
            {% for tag in post.tags %}
              <h1>{{tag}}</h1>
            {% endfor %}
            {% for tag in tags %}
                <h4>{{tag}}</h4>
            {% endfor %}
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
