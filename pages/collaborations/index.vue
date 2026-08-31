<template>
  <div class="collaborations-page">
    <section class="page-header">
      <div class="container">
        <h1>{{ $t('nav.collaborations') }}</h1>
        <p>We partner with leading open-source projects and teams</p>
      </div>
    </section>

    <section class="collaborations-content">
      <div class="container">
        <div class="card-grid">
          <div class="card collab-card">
            <div class="collab-header">
              <div class="collab-icon">🧠</div>
              <div>
                <h3>Dirac.run</h3>
                <span class="collab-tag">AI Inference Platform</span>
              </div>
            </div>
            <p>
              Advanced AI agent platform for automated task execution, research, and multi-step 
              problem solving. MovtiGroup contributes to optimization and deployment processes.
            </p>
            <a href="https://github.com/dirac-run/dirac" target="_blank" class="btn btn-primary btn-small">
              View on GitHub
            </a>
          </div>

          <div class="card collab-card">
            <div class="collab-header">
              <div class="collab-icon">💻</div>
              <div>
                <h3>Kilo Code</h3>
                <span class="collab-tag">AI Coding Assistant</span>
              </div>
            </div>
            <p>
              Open-source AI coding assistant with model routing, benchmarking, and autonomous 
              coding capabilities. MovtiGroup contributes to model integration and testing.
            </p>
            <a href="https://github.com/kilo-org/kilo" target="_blank" class="btn btn-primary btn-small">
              View on GitHub
            </a>
          </div>

          <div class="card collab-card">
            <div class="collab-header">
              <div class="collab-icon">🤖</div>
              <div>
                <h3>Hermes Agent</h3>
                <span class="collab-tag">AI Agent Framework</span>
              </div>
            </div>
            <p>
              Self-hosted AI agent framework with deep integration for developers and teams 
              seeking full control. MovtiGroup contributes to development and testing.
            </p>
            <a href="https://github.com/NousResearch/hermes-agent" target="_blank" class="btn btn-primary btn-small">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.collaborations-page {
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

.collaborations-content {
  padding: 3rem 0;
}

.collab-card {
  padding: 2rem;
}

.collab-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.collab-icon {
  font-size: 2.5rem;
}

.collab-card h3 {
  color: var(--text-bright);
  margin-bottom: 0.25rem;
}

.collab-tag {
  color: var(--accent);
  font-size: 0.85rem;
}

.collab-card p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}
</style>
