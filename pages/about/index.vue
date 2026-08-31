<template>
  <div class="about-page">
    <section class="page-header">
      <div class="container">
        <h1>{{ $t('nav.about') }}</h1>
        <p>Learn more about MovtiGroup and our mission</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-grid">
          <div class="about-text">
            <h2>Our Mission</h2>
            <p>
              MovtiGroup is dedicated to building innovative software solutions and specialized 
              open-source tools for developers worldwide. We believe in the power of open source 
              and community-driven development.
            </p>
            <p>
              Our team focuses on creating tools that prioritize speed, security, and developer 
              experience. From AI coding agents to infrastructure solutions, we build with passion 
              and precision.
            </p>
          </div>
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number">131+</span>
              <span class="stat-label">Technical Articles</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">21+</span>
              <span class="stat-label">Categories</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5+</span>
              <span class="stat-label">Active Projects</span>
            </div>
          </div>
        </div>

        <div class="team-section">
          <h2>Our Team</h2>
          <div class="card-grid">
            <div class="card team-card">
              <div class="team-avatar">👨‍💻</div>
              <h3>Taha Tehrani</h3>
              <p>Founder & Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  padding-top: 100px;
}

.page-header {
  text-align: center;
  padding: 3rem 0;
  background: var(--bg-card);
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--text-muted);
}

.about-content {
  padding: 3rem 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.about-text h2 {
  color: var(--text-bright);
  margin-bottom: 1rem;
}

.about-text p {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: 1rem;
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stat-item {
  background: var(--bg-card);
  padding: 1.5rem;
  border-radius: var(--radius);
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
}

.stat-label {
  color: var(--text-muted);
}

.team-section {
  text-align: center;
}

.team-section h2 {
  color: var(--text-bright);
  margin-bottom: 2rem;
}

.team-card {
  padding: 2rem;
  text-align: center;
}

.team-avatar {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.team-card h3 {
  color: var(--text-bright);
  margin-bottom: 0.5rem;
}

.team-card p {
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}
</style>
