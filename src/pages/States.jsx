import {
  PlayCircle,
  RotateCcw,
  GitBranch,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const states = [
  {
    state: "q0",
    title: "Start / Reset",
    description:
      "Initializes a new pass and moves the machine to the first element of the sequence.",
    action: "Start a new Bubble Sort pass",
    next: "q1",
    type: "start",
  },
  {
    state: "q1",
    title: "Compare",
    description:
      "Reads two adjacent values from the tape and checks whether they are in the correct order.",
    action: "Compare left and right values",
    next: "q2 / q3 / q4",
    type: "compare",
  },
  {
    state: "q2",
    title: "Swap",
    description:
      "If the left value is greater than the right value, the machine rewrites the two values in opposite order.",
    action: "Swap adjacent values",
    next: "q3",
    type: "swap",
  },
  {
    state: "q3",
    title: "Shift",
    description:
      "Moves the tape head one position to the right so the next adjacent pair can be examined.",
    action: "Move head right",
    next: "q1 / q4",
    type: "shift",
  },
  {
    state: "q4",
    title: "End-of-Pass Check",
    description:
      "Checks whether any swap occurred during the current pass.",
    action: "Check swap status",
    next: "q5 / qf",
    type: "check",
  },
  {
    state: "q5",
    title: "Return",
    description:
      "Moves the tape head back toward the first element before starting another pass.",
    action: "Move head left",
    next: "q0",
    type: "return",
  },
  {
    state: "qf",
    title: "Halt",
    description:
      "The machine stops when a complete pass finishes without requiring any swaps.",
    action: "Terminate execution",
    next: "—",
    type: "halt",
  },
];

function States() {
  return (
    <div className="states-page">
      <div className="states-header">
        <div>
          <div className="page-badge">STATE MACHINE</div>
          <h1>Turing Machine States</h1>
          <p>
            Understand how each state controls the Bubble Sort
            execution and how the machine moves between states.
          </p>
        </div>

        <div className="state-count">
          <strong>7</strong>
          <span>STATES</span>
        </div>
      </div>

      <section className="state-flow-panel">
        <div className="panel-heading">
          <div>
            <span>STATE FLOW</span>
            <h2>Machine Execution Path</h2>
          </div>
        </div>

        <div className="state-flow">
          <div className="flow-node start-node">
            <strong>q0</strong>
            <span>Start</span>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-node">
            <strong>q1</strong>
            <span>Compare</span>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-node swap-node">
            <strong>q2</strong>
            <span>Swap</span>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-node">
            <strong>q3</strong>
            <span>Shift</span>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-node">
            <strong>q4</strong>
            <span>Check</span>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-node">
            <strong>q5</strong>
            <span>Return</span>
          </div>

          <ArrowRight className="flow-arrow" />

          <div className="flow-node halt-node">
            <strong>qf</strong>
            <span>Halt</span>
          </div>
        </div>

        <div className="flow-note">
          <GitBranch size={17} />
          <span>
            From <strong>q1</strong>, the machine either swaps through
            <strong> q2</strong>, shifts through <strong>q3</strong>,
            or reaches the end-of-pass check through <strong>q4</strong>.
          </span>
        </div>
      </section>

      <section className="states-grid">
        {states.map((item) => (
          <article
            className={`state-card state-card-${item.type}`}
            key={item.state}
          >
            <div className="state-card-top">
              <div className="state-symbol">{item.state}</div>

              {item.type === "halt" ? (
                <CheckCircle2 size={20} />
              ) : item.type === "swap" ? (
                <RotateCcw size={20} />
              ) : (
                <PlayCircle size={20} />
              )}
            </div>

            <h2>{item.title}</h2>

            <p>{item.description}</p>

            <div className="state-detail">
              <span>ACTION</span>
              <strong>{item.action}</strong>
            </div>

            <div className="state-detail">
              <span>NEXT STATE</span>
              <strong>{item.next}</strong>
            </div>
          </article>
        ))}
      </section>

      <section className="state-logic-panel">
        <div className="panel-heading">
          <div>
            <span>DECISION LOGIC</span>
            <h2>How the States Work Together</h2>
          </div>
        </div>

        <div className="logic-steps">
          <div className="logic-step">
            <div className="logic-number">01</div>
            <div>
              <strong>Begin a pass</strong>
              <p>
                q0 resets the head to the first element and starts
                a new pass.
              </p>
            </div>
          </div>

          <div className="logic-step">
            <div className="logic-number">02</div>
            <div>
              <strong>Compare adjacent values</strong>
              <p>
                q1 reads the current pair and determines whether
                the values are out of order.
              </p>
            </div>
          </div>

          <div className="logic-step">
            <div className="logic-number">03</div>
            <div>
              <strong>Swap when necessary</strong>
              <p>
                q2 rewrites the pair when the left value is greater
                than the right value.
              </p>
            </div>
          </div>

          <div className="logic-step">
            <div className="logic-number">04</div>
            <div>
              <strong>Move through the tape</strong>
              <p>
                q3 moves the head right and continues comparing
                adjacent values.
              </p>
            </div>
          </div>

          <div className="logic-step">
            <div className="logic-number">05</div>
            <div>
              <strong>Check the pass</strong>
              <p>
                q4 checks whether the current pass performed any swaps.
              </p>
            </div>
          </div>

          <div className="logic-step">
            <div className="logic-number">06</div>
            <div>
              <strong>Return or halt</strong>
              <p>
                q5 starts another pass when swaps occurred. If no
                swaps occurred, the machine enters qf.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default States;