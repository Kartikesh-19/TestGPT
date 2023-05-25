import React, { useEffect } from "react";

import "./App.css";
import image from "./assets/sendmsg.svg";

const App = () => {
  const [value, setValue] = React.useState(null);
  console.log("🚀 ~ file: App.jsx:7 ~ App ~ value:", value);
  const [message, setMessage] = React.useState(null);
  const [prevChat, setPrevChat] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [currentTitle, setcurrentTitle] = React.useState(null);
  const [history, setHistory] = React.useState([]);
  // const [updVal, setUpdVal] = React.useState("");
  console.log("🚀 ~ file: App.jsx:13 ~ App ~ history:", history);
  // console.log("🚀 ~ file: App.jsx:8 ~ App ~ message:", message);
  const getMessage = async () => {
    setcurrentTitle(value);
    setHistory((prev) => {
      let updVal = [...prev];
      updVal.push(value);
      return updVal;
    });

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const respose = await fetch("http://localhost:8000/completions", options);
      console.log("🚀 ~ file: App.jsx:23 ~ getMessage ~ respose:", respose);
      const data = await respose.json();
      setValue("");
      console.log("🚀 ~ file: App.jsx:24 ~ getMessage ~ data:", data);
      setMessage(data?.choices[0]?.message);
    } catch (err) {
      console.log("err===========>", err);
    }
  };
  useEffect(() => {
    if (message) {
      setPrevChat((prevState) => {
        let updVal = [...prevState];
        updVal.push(message);
        return updVal;
      });
    }
  }, [message]);

  console.log("🚀 ~ file: App.jsx:10 ~ App ~ prevChat:", prevChat, history);
  return (
    <>
      <div className="app">
        <section className="side-bar">
          <button
            className="button"
            onClick={() => {
              setValue("");
              setMessage(null);
              setPrevChat([]);
            }}
          >
            + New Chat
          </button>
          {message ? (
            <ul className="history">
              <li>
                {history.map((v, i) => {
                  return (
                    <div
                      key={i}
                      onClick={() => setEdit(true)}
                      aria-hidden="true"
                    >
                      {edit ? (
                        <input
                          type="text"
                          value={v}
                          onChange={(e) => {
                            setHistory((prev) => [...prev, e.target.value]);
                          }}
                        />
                      ) : (
                        <span>{v}</span>
                      )}
                      <br />
                    </div>
                  );
                })}
              </li>
            </ul>
          ) : null}
          <nav>
            <p>Made By Kartikesh</p>
          </nav>
        </section>
        <section className="main">
          {!currentTitle && <h1>Capanicus GPT</h1>}
          <ul className="feed">
            {prevChat.map((val) => {
              return (
                <div key={val.title} style={{ scrollBehavior: "smooth" }}>
                  {val.content}
                  <br />
                </div>
              );
            })}
          </ul>
          <div className="bottom-section">
            <div className="input-container">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div
                type="sumbit"
                className="submit"
                aria-hidden="true"
                onClick={value ? getMessage : null}
              >
                <img
                  src={image}
                  alt="Send Message SVG"
                  style={{
                    right: 0,
                    margin: -4,
                    width: "20px",
                    height: "20px",
                    paddingRight: 0,
                    top: 150,
                    backgroundColor: "#f1ff1",
                  }}
                />
              </div>
            </div>
            <p className="info">
              Generative Pre-trained Transformer 3 (GPT-3) is an autoregressive
              language model released by OpenAI in 2020 that uses deep learning
              to produce human-like text. When given a prompt, it will generate
              text that continues the prompt.
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
