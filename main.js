Vue.component('article-card', {
  template: `
    <div class="col s12 m6 l4">
      <div class="card">
          <div class="card-image">
            <img :src="article.urlToImage" class="image">
          </div>
          <div class="card-content">
              <span class="card-title activator brown-text text-darken-4" v-text="article.title"></span>
            <p v-text="article.content"></p>
          </div>
          <div class="card-action">
            <small v-text="fromPublishedAt"></small>
            <a :href="article.url" target="_blank" class="right">Saiba mais</a>
          </div>
        </div>
    </div>
  `,
  props: {
    article: Object
  },
  computed: {
    fromPublishedAt() {
      return moment(this.article.publishedAt).fromNow();
    }
  }
});

Vue.component('navbar', {
  template: `
    <nav>
      <div class="container">
        <div class="nav-wrapper">
          <a href="#!" class="brand-logo" id="logo">&nbsp;FakeNews</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li v-for="category in categories"><a href="" class="menu-font" v-text="category"></a></li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  data() {
    return {
      categories: [
        'Business',
        'Sports',
        'Science',
        'Technology',
        'Entertainment',
        'General',
        'Health',
      ]
    }
  }
});

moment.locale('pt');

new Vue({
  el: "#app",
  data: {
    articles: []
  },
  mounted() {
    let url = "https://newsapi.org/v2/top-headlines";
    let params = {
      params: {
        country: 'pt',
        category: 'sports',
        apiKey: 'f360d65f674d48fabca570d30dac2a42'
      }
    };
    
    axios
      .get(url, params)
      .then(response => (this.articles = response.data.articles));
  },
  computed: {
    recentsArticles() {
      return this.articles.filter(item =>
        moment(item.publishedAt).isAfter(moment().subtract(12, "hours"))
      ).splice(0,3);
    },
    olderArticles() {
      return this.articles.filter(article => 
        !this.recentsArticles.some(recentArticle => recentArticle.url === article.url)
      )
    },
  }
});