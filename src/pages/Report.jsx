import {
  BookOpen,
  Cpu,
  Database,
  GitBranch,
  ArrowRight,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

const states = [
  ["q0", "Start / Reset"],
  ["q1", "Compare"],
  ["q2", "Swap"],
  ["q3", "Shift"],
  ["q4", "End-of-Pass Check"],
  ["q5", "Return"],
  ["qf", "Halt"],
];

function Report() {
  return (
    <div className="report-page">
      {/* HEADER */}
      <div className="report-header">
        <div>
          <div className="page-badge">PROJECT REPORT</div>

          <h1>Bubble Sort Using Turing Machine</h1>

          <p>
            A visual and interactive representation of the Bubble Sort
            algorithm using Turing Machine states, tape operations,
            head movement, comparisons, and swaps.
          </p>
        </div>

        <div className="report-badge">
          <BookOpen size={20} />
          <span>Theory of Computation</span>
        </div>
      </div>

      {/* OVERVIEW */}
      <section className="report-section">
        <div className="report-section-title">
          <div className="report-icon">
            <BookOpen size={21} />
          </div>

          <div>
            <span>01</span>
            <h2>Problem Statement</h2>
          </div>
        </div>

        <div className="report-content">
          <p>
            The objective of this project is to represent the Bubble Sort
            algorithm using a Turing Machine model. The machine repeatedly
            compares adjacent values on the tape and swaps them whenever
            they are in the wrong order.
          </p>

          <p>
            The process continues through multiple passes until a complete
            pass is performed without any swap. At that point, the machine
            enters its final halt state.
          </p>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="report-section">
        <div className="report-section-title">
          <div className="report-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>02</span>
            <h2>Objectives</h2>
          </div>
        </div>

        <div className="objective-grid">
          <div className="objective-card">
            <strong>01</strong>
            <h3>Model Bubble Sort</h3>
            <p>
              Represent adjacent comparison and swapping operations
              using Turing Machine states.
            </p>
          </div>

          <div className="objective-card">
            <strong>02</strong>
            <h3>Demonstrate Tape Operations</h3>
            <p>
              Visualize how values are read, rewritten, and traversed
              using the machine tape.
            </p>
          </div>

          <div className="objective-card">
            <strong>03</strong>
            <h3>Track State Transitions</h3>
            <p>
              Show how the machine moves between q0, q1, q2, q3,
              q4, q5, and qf.
            </p>
          </div>

          <div className="objective-card">
            <strong>04</strong>
            <h3>Detect Completion</h3>
            <p>
              Halt the machine when a complete pass requires no swaps.
            </p>
          </div>
        </div>
      </section>

      {/* TURING MACHINE MODEL */}
      <section className="report-section">
        <div className="report-section-title">
          <div className="report-icon">
            <Cpu size={21} />
          </div>

          <div>
            <span>03</span>
            <h2>Turing Machine Model</h2>
          </div>
        </div>

        <div className="model-grid">
          <div className="model-card">
            <Database size={22} />

            <h3>Tape</h3>

            <p>
              The tape stores the integer sequence followed by a delimiter
              and a blank symbol.
            </p>

            <div className="tape-example">
              <span>5</span>
              <span>3</span>
              <span>8</span>
              <span>1</span>
              <span>4</span>
              <span className="delimiter">#</span>
              <span className="blank">B</span>
            </div>
          </div>

          <div className="model-card">
            <GitBranch size={22} />

            <h3>States</h3>

            <p>
              Seven states control the complete sorting process,
              from initialization to the final halt.
            </p>

            <div className="state-sequence">
              q0 → q1 → q2 → q3 → q4 → q5 → qf
            </div>
          </div>

          <div className="model-card">
            <ArrowRight size={22} />

            <h3>Head Movement</h3>

            <p>
              The head moves right while comparing adjacent values
              and moves back toward the beginning after a pass.
            </p>

            <div className="movement-example">
              RIGHT → RIGHT → RIGHT → LEFT
            </div>
          </div>
        </div>
      </section>

      {/* STATES TABLE */}
      <section className="report-section">
        <div className="report-section-title">
          <div className="report-icon">
            <GitBranch size={21} />
          </div>

          <div>
            <span>04</span>
            <h2>State Description</h2>
          </div>
        </div>

        <div className="report-state-table">
          <div className="report-table-header">
            <span>STATE</span>
            <span>FUNCTION</span>
          </div>

          {states.map(([state, description]) => (
            <div className="report-table-row" key={state}>
              <strong>{state}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ALGORITHM */}
      <section className="report-section">
        <div className="report-section-title">
          <div className="report-icon">
            <BarChart3 size={21} />
          </div>

          <div>
            <span>05</span>
            <h2>Execution Algorithm</h2>
          </div>
        </div>

        <div className="algorithm-steps">
          <div className="algorithm-step">
            <div>01</div>
            <p>
              Initialize the tape with the input sequence followed by
              <strong> # </strong>
              and
              <strong> B</strong>.
            </p>
          </div>

          <div className="algorithm-step">
            <div>02</div>
            <p>
              Enter <strong>q0</strong> and begin a new pass from
              the first element.
            </p>
          </div>

          <div className="algorithm-step">
            <div>03</div>
            <p>
              In <strong>q1</strong>, compare two adjacent values.
            </p>
          </div>

          <div className="algorithm-step">
            <div>04</div>
            <p>
              If the left value is greater, enter <strong>q2</strong>
              and swap the two values.
            </p>
          </div>

          <div className="algorithm-step">
            <div>05</div>
            <p>
              Enter <strong>q3</strong> and move the head toward the
              next adjacent pair.
            </p>
          </div>

          <div className="algorithm-step">
            <div>06</div>
            <p>
              When the end of the sequence is reached, enter
              <strong> q4 </strong>
              and check whether a swap occurred.
            </p>
          </div>

          <div className="algorithm-step">
            <div>07</div>
            <p>
              If swaps occurred, use <strong>q5</strong> to return
              to the beginning and start another pass.
            </p>
          </div>

          <div className="algorithm-step">
            <div>08</div>
            <p>
              If no swaps occurred, enter <strong>qf</strong> and
              halt the machine.
            </p>
          </div>
        </div>
      </section>

      {/* SAMPLE EXECUTION */}
      <section className="report-section">
        <div className="report-section-title">
          <div className="report-icon">
            <BarChart3 size={21} />
          </div>

          <div>
            <span>06</span>
            <h2>Sample Execution</h2>
          </div>
        </div>

        <div className="execution-example">
          <div className="execution-input">
            <span>INPUT</span>
            <strong>5 3 8 1 4</strong>
          </div>

          <div className="execution-arrow">
            <ArrowRight size={24} />
          </div>

          <div className="execution-output">
            <span>OUTPUT</span>
            <strong>1 3 4 5 8</strong>
          </div>
        </div>

        <div className="pass-table">
          <div className="pass-header">
            <span>PASS</span>
            <span>SEQUENCE AFTER PASS</span>
            <span>SWAPS</span>
          </div>

          <div>
            <strong>1</strong>
            <span>3 5 1 4 8</span>
            <span>3</span>
          </div>

          <div>
            <strong>2</strong>
            <span>3 1 4 5 8</span>
            <span>2</span>
          </div>

          <div>
            <strong>3</strong>
            <span>1 3 4 5 8</span>
            <span>1</span>
          </div>

          <div>
            <strong>4</strong>
            <span>1 3 4 5 8</span>
            <span>0</span>
          </div>
        </div>
      </section>

      {/* RESULT */}
      <section className="report-result">
        <CheckCircle2 size={25} />

        <div>
          <span>FINAL RESULT</span>

          <h2>
            Turing Machine reaches qf
          </h2>

          <p>
            The sequence is sorted when a complete pass is completed
            without requiring any swaps.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Report;