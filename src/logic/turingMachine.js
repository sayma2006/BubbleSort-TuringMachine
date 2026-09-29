// ============================================================
// Bubble Sort Turing Machine
// ============================================================
//
// States:
// q0 = Start / Reset
// q1 = Compare adjacent values
// q2 = Swap values
// q3 = Shift head
// q4 = End-of-pass check
// q5 = Return to beginning
// qf = Halt
//
// Tape format:
// [values] # B
//
// Example:
// 5 3 8 1 4 # B
//
// Expected result:
// 1 3 4 5 8 # B
//
// Case-study trace:
// Pass 1 -> 3 swaps
// Pass 2 -> 1 swap
// Pass 3 -> 1 swap
// Pass 4 -> 0 swaps
// Total  -> 5 swaps
// ============================================================

export const STATES = {
  START: "q0",
  COMPARE: "q1",
  SWAP: "q2",
  SHIFT: "q3",
  PASS_CHECK: "q4",
  RETURN: "q5",
  HALT: "qf",
};


// ------------------------------------------------------------
// Create a new machine
// ------------------------------------------------------------

export function createMachine(input) {
  const cleanedInput = input.trim();

  if (!cleanedInput) {
    throw new Error("Please enter at least one integer.");
  }

  const values = cleanedInput
    .split(/\s+/)
    .map(Number);

  const valid = values.every(
    (value) =>
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 9
  );

  if (!valid) {
    throw new Error(
      "Enter single-digit integers from 0 to 9."
    );
  }

  return {
    tape: [...values, "#", "B"],

    // Current tape position
    head: 0,

    // Initial state
    state: STATES.START,

    // Statistics
    pass: 0,
    comparisons: 0,
    swaps: 0,
    swapsThisPass: 0,

    // Machine status
    halted: false,

    // Currently compared values
    currentLeft: null,
    currentRight: null,

    // Human-readable operation
    operation: "Machine initialized",

    // Transition information
    transition: {
      read: values[0],
      action: "Start machine",
      nextState: STATES.START,
    },

    // Complete execution history
    history: [],
  };
}


// ------------------------------------------------------------
// Create history record
// ------------------------------------------------------------

function addHistory(next) {
  next.history.push({
    step: next.history.length + 1,
    state: next.state,
    head: next.head,
    tape: [...next.tape],
    operation: next.operation,
    comparisons: next.comparisons,
    swaps: next.swaps,
    swapsThisPass: next.swapsThisPass,
    pass: next.pass,
    currentLeft: next.currentLeft,
    currentRight: next.currentRight,
    transition: {
      ...next.transition,
    },
  });
}


// ------------------------------------------------------------
// Execute ONE Turing Machine transition
// ------------------------------------------------------------

export function stepMachine(machine) {
  if (machine.halted) {
    return machine;
  }

  const next = {
    ...machine,

    tape: [...machine.tape],

    transition: {
      ...machine.transition,
    },

    history: [...machine.history],
  };


  // ==========================================================
  // q0 — START / RESET
  // ==========================================================

  switch (next.state) {

    case STATES.START: {
      next.pass += 1;

      next.swapsThisPass = 0;

      next.head = 0;

      next.currentLeft = null;
      next.currentRight = null;

      next.operation =
        `Pass ${next.pass} started`;

      next.transition = {
        read: next.tape[next.head],
        action: "Move to first element",
        nextState: STATES.COMPARE,
      };

      next.state = STATES.COMPARE;

      break;
    }


    // ========================================================
    // q1 — COMPARE
    // ========================================================

    case STATES.COMPARE: {

      const left = next.tape[next.head];

      const right = next.tape[next.head + 1];


      // Reached the # delimiter.
      // This means the current pass is complete.
      if (
        right === "#" ||
        right === undefined
      ) {

        next.currentLeft = null;
        next.currentRight = null;

        next.operation =
          `Pass ${next.pass} reached the end`;

        next.transition = {
          read: "#",
          action: "Check whether any swap occurred",
          nextState: STATES.PASS_CHECK,
        };

        next.state = STATES.PASS_CHECK;

        break;
      }


      next.currentLeft = Number(left);
      next.currentRight = Number(right);

      next.comparisons += 1;


      // ------------------------------------------------------
      // Values are out of order
      // ------------------------------------------------------

      if (Number(left) > Number(right)) {

        next.operation =
          `Compare ${left} > ${right} → swap required`;

        next.transition = {
          read: `${left}, ${right}`,
          action: "Values are out of order",
          nextState: STATES.SWAP,
        };

        next.state = STATES.SWAP;

      }

      // ------------------------------------------------------
      // Values are already in correct order
      // ------------------------------------------------------

      else {

        next.operation =
          `Compare ${left} ≤ ${right} → no swap`;

        next.transition = {
          read: `${left}, ${right}`,
          action: "Keep order and move right",
          nextState: STATES.SHIFT,
        };

        next.state = STATES.SHIFT;
      }

      break;
    }


    // ========================================================
    // q2 — SWAP
    // ========================================================

    case STATES.SWAP: {

      const left = next.tape[next.head];

      const right = next.tape[next.head + 1];


      // ------------------------------------------------------
      // Temporary X/Y marking
      // ------------------------------------------------------

      // The case study describes X/Y as temporary markers
      // during the rewriting process.
      //
      // They are internal markers; the final tape stores
      // the rewritten values.
      const markedLeft = "X";
      const markedRight = "Y";

      next.tape[next.head] = markedLeft;
      next.tape[next.head + 1] = markedRight;


      // ------------------------------------------------------
      // Rewrite in opposite order
      // ------------------------------------------------------

      next.tape[next.head] = right;
      next.tape[next.head + 1] = left;


      next.swaps += 1;

      next.swapsThisPass += 1;


      next.operation =
        `Swap ${left} and ${right} → ${right}, ${left}`;


      next.transition = {
        read: `${left}, ${right}`,
        action: `Rewrite as ${right}, ${left}`,
        nextState: STATES.SHIFT,
      };

      next.state = STATES.SHIFT;

      break;
    }


    // ========================================================
    // q3 — SHIFT HEAD RIGHT
    // ========================================================

    case STATES.SHIFT: {

      next.head += 1;


      // Check the symbol AFTER the current cell.
      //
      // If it is #, the current cell is the final value
      // that was involved in the pass.
      const followingSymbol =
        next.tape[next.head + 1];


      if (
        followingSymbol === "#" ||
        followingSymbol === undefined
      ) {

        next.operation =
          "Reached end of current pass";

        next.transition = {
          read: next.tape[next.head],
          action: "Move to end-of-pass check",
          nextState: STATES.PASS_CHECK,
        };

        next.state = STATES.PASS_CHECK;

      } else {

        next.operation =
          `Move head right to position ${next.head}`;

        next.transition = {
          read: next.tape[next.head],
          action: "Move Right",
          nextState: STATES.COMPARE,
        };

        next.state = STATES.COMPARE;
      }

      break;
    }


    // ========================================================
    // q4 — END-OF-PASS CHECK
    // ========================================================

    case STATES.PASS_CHECK: {

      // ------------------------------------------------------
      // No swaps → sorted → HALT
      // ------------------------------------------------------

      if (next.swapsThisPass === 0) {

        next.operation =
          "No swaps in this pass → machine halts";

        next.transition = {
          read: "#",
          action: "No further swaps required",
          nextState: STATES.HALT,
        };

        next.state = STATES.HALT;

        next.halted = true;

      }

      // ------------------------------------------------------
      // At least one swap → another pass
      // ------------------------------------------------------

      else {

        next.operation =
          `Pass ${next.pass} completed → return to beginning`;

        next.transition = {
          read: "#",
          action: "Swaps occurred; return left",
          nextState: STATES.RETURN,
        };

        next.state = STATES.RETURN;
      }

      break;
    }


    // ========================================================
    // q5 — RETURN TO BEGINNING
    // ========================================================

    case STATES.RETURN: {

      if (next.head > 0) {

        next.head -= 1;

        next.operation =
          "Move head left toward first element";

        next.transition = {
          read: next.tape[next.head],
          action: "Move Left",
          nextState: STATES.RETURN,
        };

      } else {

        next.operation =
          `Ready for pass ${next.pass + 1}`;

        next.transition = {
          read: next.tape[next.head],
          action: "Start next pass",
          nextState: STATES.START,
        };

        next.state = STATES.START;
      }

      break;
    }


    // ========================================================
    // qf — HALT
    // ========================================================

    case STATES.HALT: {

      next.halted = true;

      next.operation =
        "Machine halted — sequence is sorted";

      break;
    }


    default: {

      throw new Error(
        `Unknown machine state: ${next.state}`
      );
    }
  }


  // Save this transition to history
  addHistory(next);

  return next;
}


// ------------------------------------------------------------
// Run until the machine reaches qf
// ------------------------------------------------------------

export function runMachine(
  machine,
  maxSteps = 10000
) {
  let current = machine;

  let steps = 0;

  while (
    !current.halted &&
    steps < maxSteps
  ) {

    current = stepMachine(current);

    steps++;
  }

  return current;
}