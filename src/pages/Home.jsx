import {
  ArrowRight,
  Cpu,
  GitBranch,
  Activity,
} from "lucide-react";

function Home({ onStartSimulation }) {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Cpu size={16} />
            INTERACTIVE TURING MACHINE
          </div>

          <h1>
            Bubble Sort
            <span>Using Turing Machine</span>
          </h1>

          <p>
            Explore how a Turing Machine can represent the Bubble Sort
            algorithm through states, tape rewriting, head movement,
            comparisons, and swaps.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-button"
              onClick={onStartSimulation}
            >
              Start Simulation
              <ArrowRight size={18} />
            </button>

            <button className="secondary-button">
              Learn How It Works
            </button>
          </div>
        </div>

        <div className="tm-preview">
          <div className="preview-header">
            <span>TURING MACHINE</span>

            <span className="status-dot">
              ● READY
            </span>
          </div>

          <div className="tape">
            <div className="tape-cell active">5</div>
            <div className="tape-cell">3</div>
            <div className="tape-cell">8</div>
            <div className="tape-cell">1</div>
            <div className="tape-cell">4</div>
            <div className="tape-cell delimiter">#</div>
            <div className="tape-cell blank">B</div>
          </div>

          <div className="head-indicator">
            <span>▲</span>
            <span>HEAD</span>
          </div>

          <div className="state-box">
            <div>
              <small>CURRENT STATE</small>
              <strong>q0</strong>
            </div>

            <div>
              <small>NEXT STATE</small>
              <strong>q1</strong>
            </div>

            <div className="swap-status">
              READY
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>Algorithm meets Automata</h2>

          <p>
            Visualize every important operation of Bubble Sort through
            the formal behavior of a Turing Machine.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <GitBranch size={24} />
            </div>

            <h3>State Machine</h3>

            <p>
              Follow states q0, q1, q2, q3, q4, q5 and qf during
              execution.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Activity size={24} />
            </div>

            <h3>Dynamic Tape</h3>

            <p>
              Watch the tape contents change as the machine compares
              and rewrites adjacent values.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Cpu size={24} />
            </div>

            <h3>Execution Trace</h3>

            <p>
              Track comparisons, swaps, passes, head movement and
              machine state transitions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;