import { useEffect, useRef, useState } from "react";

import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Gauge,
} from "lucide-react";

import {
  createMachine,
  stepMachine,
  STATES,
} from "../logic/turingMachine";

const DEFAULT_INPUT = "5 3 8 1 4";

function Simulator({
  machine,
  setMachine,
  input,
  setInput,
}) {
  const [isRunning, setIsRunning] =
    useState(false);

  const [speed, setSpeed] =
    useState("normal");

  const timerRef =
    useRef(null);

  const speedValues = {
    slow: 1000,
    normal: 500,
    fast: 150,
  };


  // ----------------------------------------------------------
  // STEP
  // ----------------------------------------------------------

  const handleStep = () => {
    if (machine.halted) {
      setIsRunning(false);
      return;
    }

    const nextMachine =
      stepMachine(machine);

    setMachine(nextMachine);
  };


  // ----------------------------------------------------------
  // RESET
  // ----------------------------------------------------------

  const handleReset = () => {
    setIsRunning(false);

    try {
      const newMachine =
        createMachine(input);

      setMachine(newMachine);

    } catch (error) {

      const fallback =
        createMachine(DEFAULT_INPUT);

      setMachine(fallback);
      setInput(DEFAULT_INPUT);
    }
  };


  // ----------------------------------------------------------
  // RUN
  // ----------------------------------------------------------

  const handleRun = () => {

    if (machine.halted) {
      return;
    }

    setIsRunning(true);
  };


  // ----------------------------------------------------------
  // PAUSE
  // ----------------------------------------------------------

  const handlePause = () => {
    setIsRunning(false);
  };


  // ----------------------------------------------------------
  // AUTOMATIC EXECUTION
  // ----------------------------------------------------------

  useEffect(() => {

    if (!isRunning) {
      return;
    }


    timerRef.current =
      setInterval(() => {

        setMachine((current) => {

          if (current.halted) {

            setIsRunning(false);

            return current;
          }

          const next =
            stepMachine(current);

          if (next.halted) {
            setIsRunning(false);
          }

          return next;
        });

      }, speedValues[speed]);


    return () => {

      clearInterval(
        timerRef.current
      );

    };

  }, [
    isRunning,
    speed,
    setMachine,
  ]);


  // ----------------------------------------------------------
  // INPUT CHANGE
  // ----------------------------------------------------------

  const handleInputChange = (event) => {

    setInput(
      event.target.value
    );

  };


  // ----------------------------------------------------------
  // LOAD INPUT
  // ----------------------------------------------------------

  const handleLoadInput = () => {

    try {

      const newMachine =
        createMachine(input);

      setIsRunning(false);

      setMachine(newMachine);

    } catch (error) {

      alert(error.message);

    }
  };


  // ----------------------------------------------------------
  // STATE DESCRIPTIONS
  // ----------------------------------------------------------

  const stateDescriptions = {

    [STATES.START]:
      "START / RESET",

    [STATES.COMPARE]:
      "COMPARE ADJACENT VALUES",

    [STATES.SWAP]:
      "SWAP VALUES",

    [STATES.SHIFT]:
      "SHIFT HEAD RIGHT",

    [STATES.PASS_CHECK]:
      "END-OF-PASS CHECK",

    [STATES.RETURN]:
      "RETURN TO BEGINNING",

    [STATES.HALT]:
      "HALT",
  };


  return (
    <div className="simulator-page">

      {/* -------------------------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------------------------- */}

      <div className="simulator-header">

        <div>

          <div className="page-badge">
            TURING MACHINE SIMULATOR
          </div>

          <h1>
            Bubble Sort Execution
          </h1>

          <p>
            Observe the tape, head movement,
            state transitions, comparisons,
            and swaps step by step.
          </p>

        </div>


        <div
          className={`machine-status ${
            machine.halted
              ? "halted-status"
              : ""
          }`}
        >

          <span></span>

          {machine.halted
            ? "HALTED"
            : isRunning
              ? "RUNNING"
              : "READY"}

        </div>

      </div>


      {/* -------------------------------------------------- */}
      {/* INPUT */}
      {/* -------------------------------------------------- */}

      <section className="simulator-panel input-panel">

        <div className="panel-heading">

          <div>
            <span>INPUT</span>

            <h2>
              Machine Input
            </h2>
          </div>

        </div>


        <div className="input-row">

          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Example: 5 3 8 1 4"
            disabled={isRunning}
          />

          <button
            className="control-button primary-control"
            onClick={handleLoadInput}
            disabled={isRunning}
          >
            Load Input
          </button>

        </div>


        <small className="input-hint">
          Enter single-digit integers separated
          by spaces. Example: 5 3 8 1 4
        </small>

      </section>


      {/* -------------------------------------------------- */}
      {/* STATISTICS */}
      {/* -------------------------------------------------- */}

      <div className="stats-grid">

        <div className="stat-card">
          <span>PASS</span>
          <strong>
            {machine.pass}
          </strong>
        </div>


        <div className="stat-card">
          <span>COMPARISONS</span>
          <strong>
            {machine.comparisons}
          </strong>
        </div>


        <div className="stat-card">
          <span>SWAPS</span>
          <strong>
            {machine.swaps}
          </strong>
        </div>


        <div className="stat-card">
          <span>CURRENT STATE</span>
          <strong>
            {machine.state}
          </strong>
        </div>

      </div>


      {/* -------------------------------------------------- */}
      {/* TAPE */}
      {/* -------------------------------------------------- */}

      <section className="simulator-panel">

        <div className="panel-heading">

          <div>
            <span>TAPE</span>

            <h2>
              Machine Tape
            </h2>
          </div>


          <div className="tape-info">
            Input:{" "}
            <strong>
              {input || "—"}
            </strong>
          </div>

        </div>


        <div className="simulation-tape">

          {machine.tape.map(
            (symbol, index) => (

              <div
                key={`${index}-${symbol}`}
                className={`
                  sim-tape-cell
                  ${
                    index === machine.head
                      ? "active"
                      : ""
                  }
                  ${
                    symbol === "#"
                      ? "delimiter"
                      : ""
                  }
                  ${
                    symbol === "B"
                      ? "blank"
                      : ""
                  }
                `}
              >
                {symbol}
              </div>

            )
          )}

        </div>


        <div className="simulation-head">

          <span>▲</span>

          <small>
            HEAD: CELL {machine.head + 1}
          </small>

        </div>

      </section>


      {/* -------------------------------------------------- */}
      {/* CURRENT STATE + COMPARISON */}
      {/* -------------------------------------------------- */}

      <div className="simulation-grid">


        <section className="simulator-panel state-panel">

          <span className="panel-label">
            CURRENT STATE
          </span>


          <div className="current-state">

            <strong>
              {machine.state}
            </strong>

            <span>
              {stateDescriptions[
                machine.state
              ]}
            </span>

          </div>

        </section>


        <section className="simulator-panel comparison-panel">

          <span className="panel-label">
            CURRENT OPERATION
          </span>


          <div className="comparison-display">

            <div>

              <small>LEFT</small>

              <strong>
                {machine.currentLeft ??
                  "—"}
              </strong>

            </div>


            <span>
              VS
            </span>


            <div>

              <small>RIGHT</small>

              <strong>
                {machine.currentRight ??
                  "—"}
              </strong>

            </div>

          </div>

        </section>

      </div>


      {/* -------------------------------------------------- */}
      {/* OPERATION */}
      {/* -------------------------------------------------- */}

      <section className="simulator-panel operation-panel">

        <span className="panel-label">
          MACHINE OPERATION
        </span>


        <div className="operation-message">
          {machine.operation}
        </div>

      </section>


      {/* -------------------------------------------------- */}
      {/* CONTROLS */}
      {/* -------------------------------------------------- */}

      <section className="simulator-panel controls-panel">

        <div className="controls">

          {!isRunning ? (

            <button
              className="control-button primary-control"
              onClick={handleRun}
              disabled={machine.halted}
            >

              <Play size={17} />

              Run

            </button>

          ) : (

            <button
              className="control-button primary-control"
              onClick={handlePause}
            >

              <Pause size={17} />

              Pause

            </button>

          )}


          <button
            className="control-button"
            onClick={handleStep}
            disabled={
              isRunning ||
              machine.halted
            }
          >

            <SkipForward size={17} />

            Step

          </button>


          <button
            className="control-button"
            onClick={handleReset}
          >

            <RotateCcw size={17} />

            Reset

          </button>

        </div>


        <div className="speed-control">

          <Gauge size={17} />

          <span>
            Speed
          </span>


          <select
            value={speed}
            onChange={(event) =>
              setSpeed(
                event.target.value
              )
            }
          >

            <option value="slow">
              Slow
            </option>

            <option value="normal">
              Normal
            </option>

            <option value="fast">
              Fast
            </option>

          </select>

        </div>

      </section>


      {/* -------------------------------------------------- */}
      {/* TRANSITION INFORMATION */}
      {/* -------------------------------------------------- */}

      <section className="simulator-panel">

        <div className="panel-heading">

          <div>

            <span>
              EXECUTION
            </span>

            <h2>
              Transition Information
            </h2>

          </div>

        </div>


        <div className="transition-box">

          <div>
            <span>STATE</span>

            <strong>
              {machine.state}
            </strong>
          </div>


          <div>
            <span>READ</span>

            <strong>
              {machine.transition.read ??
                "—"}
            </strong>
          </div>


          <div>
            <span>ACTION</span>

            <strong>
              {machine.transition.action}
            </strong>
          </div>


          <div>
            <span>NEXT STATE</span>

            <strong>
              {machine.transition.nextState}
            </strong>
          </div>

        </div>

      </section>


      {/* -------------------------------------------------- */}
      {/* RESULT */}
      {/* -------------------------------------------------- */}

      {machine.halted && (

        <section className="simulator-panel result-panel">

          <div className="result-content">

            <span className="result-label">
              MACHINE HALTED
            </span>

            <h2>
              Sorted Sequence
            </h2>


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
              No swaps were required in the
              final pass. The Turing Machine
              has reached qf.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default Simulator;