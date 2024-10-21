import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="appContainer">
        <h1>Text Analyzer</h1>
        <textarea
          placeholder="Enter text here..."
          className="textArea"
        ></textarea>
        <button className="analyzeButton">Analyze</button>
      </div>
    </div>
  );
}

export default App;
