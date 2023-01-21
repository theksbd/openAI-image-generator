import { useReducer } from "react";
import "./App.css";
import { ACTION_TYPE, appReducer, INITIAL_STATE } from "./appReducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const handleChangePrompt = e => {
    dispatch({ type: ACTION_TYPE.SET_PROMPT, payload: e.target.value });
  };

  const handleChangeSize = e => {
    dispatch({ type: ACTION_TYPE.SET_SIZE, payload: e.target.value });
  };

  const handleClickSubmit = e => {
    e.preventDefault();
    dispatch({ type: ACTION_TYPE.FETCH_START });
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: state.prompt, size: state.size })
    };
    fetch(
      "https://openai-image-generator-api-evwd.onrender.com/api/generateImage",
      option
    )
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
          dispatch({
            type: ACTION_TYPE.FETCH_FAILURE,
            payload: data.errorResponse
          });
          return;
        }
        dispatch({ type: ACTION_TYPE.FETCH_SUCCESS, payload: data.imageURL });
      })
      .catch(error => {
        dispatch({
          type: ACTION_TYPE.FETCH_FAILURE,
          payload:
            "Something went wrong. It seems to be an internal error from our side. Please come back later!"
        });
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
                value={state.prompt}
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
            <h2 className="msg">{state.message}</h2>
            <img src={state.image} alt="" id="image" />
          </div>
        </section>
      </main>

      <div className={state.spinner ? "spinner show" : "spinner"}></div>
    </div>
  );
}

export default App;
