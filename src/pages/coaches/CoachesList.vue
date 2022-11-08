<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isCoach" link to="/register">Register as coach</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        >
        </coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoacheItem.vue';
import CoachFilter from './CoachFilter.vue';
export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
        isLoading: false,
        error: null,
        activeFilters: {
            frontend: true,
            backend: true,
            career: true,
        }
    }
  },
  isCoach() {
    return this.$store.getters['coaches/isCoach'];
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
            return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
            return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
            return true;
        }
        return false;
      })
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'] && !this.isLoading;
    },
  },
  methods: {
    setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
    },
    async loadCoaches() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong';
      }
      this.isLoading = false;
    }
  },
  created(){
    this.loadCoaches();
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
