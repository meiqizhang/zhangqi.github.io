---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <div align="left">
          <!--
          {% for post in site.categories.leetcode %}
             <li>
               <a href="{{ post.url }}" class="title"><font color="red" size="3">{{ post.title }}</font></a>
             </li>
          {% endfor %}
          -->
          {% for post in site.categories.leetcode %}
            {% for tag in post.tags %}
              <li> {{ tag }} (tag.size)</li>
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
