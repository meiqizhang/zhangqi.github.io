---
layout: default
---

<body>
  <div class="index-wrapper">
    <div class="aside">
      <div class="info-card">
        <div id="divcss5"><img src="/images/header.png" width="64px" /><br/><br/></div>
        <div align="left" style="width:auto; height:500px; overflow:auto">
          {% for post in site.categories.leetcode %}
            {% assign tags = tags | concat : post.tags | uniq %}
          {% endfor %}
          
          {% for tag in tags %}
            <h3>&nbsp;</h3>
            <a href="leetcode-{{ tag }}" class="title">{{ tag }}</a>
          {% endfor %}
        </div>

      </div>
        <div id="particles-js"></div>
      </div>

    <div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.leetcode %}
          {{ post.title  }}
        {% endfor %}
        
      <!--
        {% for title in titles %}
          {{ title }}
        {% endfor %}
      -->
        
      <!--
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
        -->
      </ul>
    </div>
    
  </div>
</body>
