import {
  Activity,
  RotateCcw,
  CircleStop,
  CheckCircle2,
  MoveRight,
} from "lucide-react";

function Trace({ machine, input }) {
  const history = machine?.history || [];

  const getType = (operation = "") => {
    const text = operation.toLowerCase();

    if (text.includes("swap") || text.includes("rewrite")) {
      return "swap";
    }

    if (text.includes("compare")) {
      return "compare";
    }

    if (text.includes("halt") || text.includes("no swaps")) {
      return "halt";
    }

    if (text.includes("pass")) {
      return "pass";
    }

    if (text.includes("move") || text.includes("return")) {
      return "move";
    }

    return "normal";
  };

  const getIcon = (type) => {
    switch (type) {
      case "swap":
        return <RotateCcw size={15} />;

      case "compare":
        return <Activity size={15} />;

      case "halt":
        return <CircleStop size={15} />;

      case "pass":
        return <CheckCircle2 size={15} />;

      case "move":
        return <MoveRight size={15} />;

      default:
        return <Activity size={15} />;
    }
  };

  return (
    <div className="trace-page">
      {/* HEADER */}
      <div className="trace-header">
        <div>
          <div className="page-badge">EXECUTION TRACE</div>

          <h1>Turing Machine Trace</h1>

          <p>
            Follow the actual sequence of machine transitions,
            comparisons, swaps, tape changes, and head movements.
          </p>
        </div>

        <div className="trace-summary">
          <span>CURRENT INPUT</span>
          <strong>{input || "—"}</strong>
        </div>
      </div>

      {/* STATISTICS */}
      <section className="trace-stats">
        <div className="trace-stat">
          <span>TRANSITIONS</span>
          <strong>{history.length}</strong>
        </div>

        <div className="trace-stat">
          <span>PASS</span>
          <strong>{machine?.pass ?? 0}</strong>
        </div>

        <div className="trace-stat">
          <span>COMPARISONS</span>
          <strong>{machine?.comparisons ?? 0}</strong>
        </div>

        <div className="trace-stat">
          <span>SWAPS</span>
          <strong>{machine?.swaps ?? 0}</strong>
        </div>

        <div className="trace-stat">
          <span>STATE</span>
          <strong>{machine?.state ?? "q0"}</strong>
        </div>
      </section>

      {/* EMPTY STATE */}
      {history.length === 0 && (
        <section className="simulator-panel empty-trace">
          <div className="empty-trace-icon">
            <Activity size={28} />
          </div>

          <h2>No execution history yet</h2>

          <p>
            Go to the Simulator and press{" "}
            <strong>Step</strong> or <strong>Run</strong>{" "}
            to generate the Turing Machine trace.
          </p>
        </section>
      )}

      {/* TRACE TABLE */}
      {history.length > 0 && (
        <section className="simulator-panel trace-panel">
          <div className="panel-heading">
            <div>
              <span>LIVE TRANSITIONS</span>
              <h2>Step-by-Step Execution</h2>
            </div>

            <div className="trace-count">
              {history.length}{" "}
              {history.length === 1
                ? "transition"
                : "transitions"}
            </div>
          </div>

          <div className="trace-table-wrapper">
            <div className="trace-table">

              {/* TABLE HEADER */}
              <div className="trace-table-header">
                <span>STEP</span>
                <span>STATE</span>
                <span>TAPE</span>
                <span>HEAD</span>
                <span>OPERATION</span>
                <span>NEXT</span>
              </div>

              {/* TABLE ROWS */}
              {history.map((item) => {
                const type = getType(item.operation);

                return (
                  <div
                    className={`trace-row trace-${type}`}
                    key={item.step}
                  >
                    {/* STEP */}
                    <span className="trace-step">
                      {item.step}
                    </span>

                    {/* STATE */}
                    <span className="trace-state">
                      {item.state}
                    </span>

                    {/* TAPE */}
                    <span className="trace-tape">
                      {item.tape?.map((symbol, index) => (
                        <span
                          key={`${item.step}-${index}`}
                          className={`
                            trace-tape-cell
                            ${
                              index === item.head
                                ? "trace-tape-active"
                                : ""
                            }
                            ${
                              symbol === "#"
                                ? "trace-tape-delimiter"
                                : ""
                            }
                            ${
                              symbol === "B"
                                ? "trace-tape-blank"
                                : ""
                            }
                          `}
                        >
                          {symbol}
                        </span>
                      ))}
                    </span>

                    {/* HEAD */}
                    <span className="trace-head">
                      <strong>
                        {item.head + 1}
                      </strong>
                    </span>

                    {/* OPERATION */}
                    <span className="trace-operation">
                      <span className="trace-icon">
                        {getIcon(type)}
                      </span>

                      <span>
                        {item.operation}
                      </span>
                    </span>

                    {/* NEXT STATE */}
                    <span className="trace-next">
                      {item.transition?.nextState ?? "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* LIVE MACHINE INFORMATION */}
      <section className="trace-live-info">

        <div className="trace-info-card">
          <span>CURRENT STATE</span>

          <strong>
            {machine?.state ?? "q0"}
          </strong>

          <p>
            Current state of the Turing Machine.
          </p>
        </div>

        <div className="trace-info-card">
          <span>CURRENT OPERATION</span>

          <strong>
            {machine?.operation ?? "Machine initialized"}
          </strong>

          <p>
            The latest operation performed.
          </p>
        </div>

        <div className="trace-info-card">
          <span>HEAD POSITION</span>

          <strong>
            CELL {(machine?.head ?? 0) + 1}
          </strong>

          <p>
            Current position of the tape head.
          </p>
        </div>

        <div className="trace-info-card">
          <span>NEXT STATE</span>

          <strong>
            {machine?.transition?.nextState ?? "q0"}
          </strong>

          <p>
            State selected by the current transition.
          </p>
        </div>

      </section>

      {/* TRACE LEGEND */}
      <section className="trace-legend-panel">
        <div className="panel-heading">
          <div>
            <span>TRACE LEGEND</span>
            <h2>Understanding the Execution</h2>
          </div>
        </div>

        <div className="trace-legend">

          <div className="legend-item">
            <span className="legend-dot legend-compare">
              <Activity size={14} />
            </span>

            <div>
              <strong>Comparison</strong>
              <p>
                Two adjacent tape values are compared.
              </p>
            </div>
          </div>

          <div className="legend-item">
            <span className="legend-dot legend-swap">
              <RotateCcw size={14} />
            </span>

            <div>
              <strong>Swap</strong>
              <p>
                Adjacent values are rewritten in opposite order.
              </p>
            </div>
          </div>

          <div className="legend-item">
            <span className="legend-dot legend-move">
              <MoveRight size={14} />
            </span>

            <div>
              <strong>Head Movement</strong>
              <p>
                The tape head moves to another cell.
              </p>
            </div>
          </div>

          <div className="legend-item">
            <span className="legend-dot legend-halt">
              <CircleStop size={14} />
            </span>

            <div>
              <strong>Halt</strong>
              <p>
                The machine reaches qf and stops.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* STATE EXPLANATION */}
      <section className="trace-explanation">

        <div className="trace-info-card">
          <span>q1</span>

          <h3>Compare</h3>

          <p>
            The machine reads two adjacent values and
            determines whether a swap is required.
          </p>
        </div>

        <div className="trace-info-card">
          <span>q2</span>

          <h3>Swap</h3>

          <p>
            When the left value is greater, the two
            tape symbols are rewritten in opposite order.
          </p>
        </div>

        <div className="trace-info-card">
          <span>q4</span>

          <h3>Pass Check</h3>

          <p>
            The machine checks whether any swap occurred
            during the current pass.
          </p>
        </div>

        <div className="trace-info-card">
          <span>qf</span>

          <h3>Halt</h3>

          <p>
            When a complete pass requires no swaps,
            the machine reaches its final state.
          </p>
        </div>

      </section>

      {/* RESULT */}
      {machine?.halted && (
        <section className="simulator-panel result-panel trace-result">
          <div className="result-content">

            <span className="result-label">
              EXECUTION COMPLETE
            </span>

            <h2>Turing Machine Halted</h2>

            <div className="result-tape">
              {machine.tape
                .filter(
                  (symbol) =>
                    symbol !== "#" &&
                    symbol !== "B"
                )
                .join("  ")}
            </div>

            <p>
              The machine reached <strong>qf</strong> because
              the final pass required no swaps.
            </p>

          </div>
        </section>
      )}
    </div>
  );
}

export default Trace;