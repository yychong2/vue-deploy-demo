<template>
   
   <div class="filters">
      <!-- FILTER BUTTONS -->
      <button
        class="filter-button"
        v-for="(category, index) in categories"
        :key="index"
        @click="filterArticle(category)"
      >
        {{ category }}
      </button>
      <!-- SHOW ALL BUTTON -->
      <button class="filter-button show-all-button" @click="showAll(category)">
        Show All
      </button>
    </div>
    <div class="container">
      <!-- ARTICLES -->
      <div class="item" v-for="item in filteredArticles" :key="item.id">
        <h3>{{ item.title }}</h3>
        <p>{{ item.content }}</p>
      </div>
    </div>
</template>

<script>

    export default {
        name: "Articles",
        data() {
        return {
            selectedArticle: null,
            categories: ["History", "Math", "Science", "Nature"],
            articles: [
              {
                id: 1,
                category: "History",
                title: "History Title 1",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 2,
                category: "History",
                title: "History Title 2",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 3,
                category: "History",
                title: "History Title 3",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 4,
                category: "Math",
                title: "Math Title 1",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 5,
                category: "Math",
                title: "Math Title 2",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 6,
                category: "Science",
                title: "Science Title 1",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 7,
                category: "Science",
                title: "Science Title 2",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 8,
                category: "Science",
                title: "Science Title 3",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 9,
                category: "Nature",
                title: "Nature Title 1",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
              {
                id: 10,
                category: "Nature",
                title: "Nature Title 2",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in malesuada libero. Nunc vulputate eros eget lacinia volutpat.",
              },
            ],
          };
        },
        methods: {
          filterArticle(category) {
            // Set selectedArticle data to
            // selected category's name
            this.selectedArticle = category;
          },
          // set selectedArticle data to null
          showAll() {
            this.selectedArticle = null;
          },
        },
        computed: {
          // When selectedArticle data changed
          // filteredArticles computed property will
          // automatically create new data model
          // by filtering out unmatched categories
          filteredArticles() {
            // If selectedArticle is equal to null
            // display all data
            const data = this.selectedArticle
              ? this.articles.filter((item) => item.category === this.selectedArticle)
              : this.articles;
            return data;
          },
        },

    }

</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  flex: 0 32%;
  height: 100px;
  margin-bottom: 2%; /* (100-32*3)/2 */
}
.filter-button {
  text-transform: uppercase;
  margin: 0 6px;
  cursor: pointer;
  font-family: monospace;
  font-size: 1.2rem;
  background: purple;
  color: #fff;
}

.show-all-button {
  background: mediumslateblue;
}
</style>