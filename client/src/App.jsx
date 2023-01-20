import { useState } from "react";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [size, setSize] = useState("small");
  const [spinner, setSpinner] = useState(false);
  const [message, setMessage] = useState("Image will be displayed here");
  const [image, setImage] = useState("");

  const handleChangePrompt = e => {
    setPrompt(e.target.value);
  };

  const handleChangeSize = e => {
    setSize(e.target.value);
  };

  const handleClickSubmit = e => {
    e.preventDefault();
    setSpinner(true);
    setPrompt("");
    setImage("");
    setMessage("Generating Image...");
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, size })
    };
    fetch("/api/generateImage", option)
      .then(response => response.json())
      .then(data => {
        setSpinner(false);
        if (!data.success) {
          setMessage(data.errorResponse);
          return;
        }
        setMessage("");
        setImage(data.imageURL);
      })
      .catch(error => {
        setSpinner(false);
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header>
        <div className="navbar">
          <div className="logo">
            <h2>OpenAI Image Genrator</h2>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a href="https://beta.openai.com/docs" target="_blank">
                  OpenAI API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section className="showcase">
          <form id="image-form">
            <h1>Describe An Image</h1>
            <div className="form-control">
              <input
                type="text"
                id="prompt"
                placeholder="Enter Text"
                value={prompt}
                onChange={handleChangePrompt}
              />
            </div>
            <div className="form-control">
              <select
                name="size"
                id="size"
                defaultValue={"medium"}
                onChange={handleChangeSize}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button type="submit" className="btn" onClick={handleClickSubmit}>
              Generate
            </button>
          </form>
        </section>

        <section className="image">
          <div className="image-container">
            <h2 className="msg">{message}</h2>
            <img src={image} alt="" id="image" />
          </div>
        </section>
      </main>

      <div className={spinner ? "spinner show" : "spinner"}></div>
    </div>
  );
}

export default App;
