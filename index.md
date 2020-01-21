---
layout: default
---


<body>
  <div class="index-wrapper">

    <div class="aside">
      <div class="info-card">
      <h2>show info</h2>
      </div>

      <div id="particles-js">
      </div>
    </div>

    <!--div class="index-content">
      <ul class="artical-list">
        {% for post in site.categories.blog %}
          <li>
            <a href="{{ post.url }}" class="title">{{ post.title }}</a>
            <div class="title-desc">{{ post.description }}</div>
          </li>
        {% endfor %}
      </ul>
    </div-->
    <div>
      <ul class="categories-list">
        {% for cat in site.categories %}
          <h2> {{ cat[0] }} </h2>
        {% endfor %}
      </ul>
    </div>

  </div>
</body>
