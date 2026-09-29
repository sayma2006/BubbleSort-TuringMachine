# Bubble Sort Using Turing Machine

An interactive web-based simulation of the **Bubble Sort algorithm represented using a Turing Machine**.

This project demonstrates how a classical sorting algorithm can be modeled using Turing Machine concepts such as **states, tape symbols, head movement, comparisons, rewriting, state transitions, and halting**.

---

## 📌 Project Overview

The project provides an interactive environment where users can enter a sequence of single-digit integers and observe how the Turing Machine performs Bubble Sort step by step.

The machine repeatedly:

1. Reads adjacent values from the tape.
2. Compares the values.
3. Swaps them if they are in the wrong order.
4. Moves the tape head to the next position.
5. Checks whether another pass is required.
6. Returns to the beginning when swaps occurred.
7. Halts when a complete pass requires no swaps.

The project combines **Bubble Sort** with the formal concepts of **Turing Machines** to make the execution easier to understand visually.

---

## 🎯 Objectives

- Represent Bubble Sort using a Turing Machine model.
- Demonstrate tape-based computation.
- Visualize comparisons and swaps.
- Show Turing Machine state transitions.
- Demonstrate tape-head movement.
- Track passes, comparisons, and swaps.
- Show the complete execution trace.
- Demonstrate the halting condition.

---

## 🧠 Turing Machine Model

### Tape

The tape contains the input sequence followed by a delimiter `#` and a blank symbol `B`.

Example:

```text
5 3 8 1 4 # B