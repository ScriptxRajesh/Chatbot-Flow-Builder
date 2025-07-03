import Navbar from "./components/Navbar";
import ReactFlowContainer from "./components/FlowContainer";
import ContextProvider from "./context/NodeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ContextProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <ReactFlowContainer />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </ContextProvider>
  );
}

export default App;
