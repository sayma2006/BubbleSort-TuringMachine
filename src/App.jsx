import { useState } from "react";
import {
  Home as HomeIcon,
  PlayCircle,
  GitBranch,
  List,
  FileText,
} from "lucide-react";

import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import States from "./pages/States";
import Trace from "./pages/Trace";
import Report from "./pages/Report";

import { createMachine } from "./logic/turingMachine";

const DEFAULT_INPUT = "5 3 8 1 4";

function App() {
  const [activePage, setActivePage] = useState("home");

  const [machine, setMachine] = useState(() =>
    createMachine(DEFAULT_INPUT)
  );

  const [input, setInput] = useState(DEFAULT_INPUT);

  const navigation = [
    {
      id: "home",
      label: "Home",
      icon: HomeIcon,
    },
    {
      id: "simulator",
      label: "Simulator",
      icon: PlayCircle,
    },
    {
      id: "states",
      label: "States",
      icon: GitBranch,
    },
    {
      id: "trace",
      label: "Trace",
      icon: List,
    },
    {
      id: "report",
      label: "Report",
      icon: FileText,
    },
  ];

  const goToPage = (page) => {
    setActivePage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <Home
            onStartSimulation={() =>
              goToPage("simulator")
            }
          />
        );

      case "simulator":
        return (
          <Simulator
            machine={machine}
            setMachine={setMachine}
            input={input}
            setInput={setInput}
          />
        );

      case "states":
        return <States />;

      case "trace":
        return (
          <Trace
            machine={machine}
            input={input}
          />
        );

      case "report":
        return <Report />;

      default:
        return (
          <Home
            onStartSimulation={() =>
              goToPage("simulator")
            }
          />
        );
    }
  };

  return (
    <div className="app">
      {/* ================= NAVBAR ================= */}

      <header className="navbar">
        <div
          className="logo"
          onClick={() => goToPage("home")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              goToPage("home");
            }
          }}
        >
          <div className="logo-mark">
            TM
          </div>

          <div className="logo-text">
            <h2>TM Sorter</h2>

            <span>
              Theory of Computation
            </span>
          </div>
        </div>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={`nav-link ${
                  activePage === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  goToPage(item.id)
                }
              >
                <Icon size={15} />

                <span>
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ================= PAGE CONTENT ================= */}

      <main>
        {renderPage()}
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <span>
          Bubble Sort Using Turing Machine
        </span>

        <span>•</span>

        <span>
          Theory of Computation
        </span>
      </footer>
    </div>
  );
}

export default App;