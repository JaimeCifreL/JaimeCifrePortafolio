const app = Vue.createApp({
  data() {
    return {
      projects: [],
      selectedTech: 'all',
      techOptions: ['all','HTML','CSS','JavaScript','Python','Flask','React','Vite']
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedTech === 'all') return this.projects;
      return this.projects.filter(p => p.technologies.includes(this.selectedTech));
    },
    visibleProjects() {
      return this.filteredProjects;
    }
  },
  methods: {
    async fetchProjects() {
      const res = await fetch('js/projects.json');
      this.projects = await res.json();
    },
    openModal(project) {
      window.location.href = `projects/detail.html?id=${project.id}`;
    },
    scrollCarousel(dir) {
      const el = this.$refs.carouselEl;
      if (!el) return;
      const amount = el.clientWidth * 0.52;
      el.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
    }
  },
  mounted() {
    this.fetchProjects();
  }
});

app.component('project-card', {
  props: ['project', 'index', 'total'],
  template: `
    <div class="project-card" @click="$root.openModal(project)">
      <div class="project-img-container">
        <img :src="project.image" :alt="project.title" class="project-img" loading="lazy" />
      </div>
      <div class="project-info">
        <div class="project-name">{{ project.title }}</div>
        <div class="project-desc">{{ project.description }}</div>
        <div class="project-tags">
          <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </div>
  `
});

app.mount('#vue-projects');