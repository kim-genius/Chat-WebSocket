import { useEffect } from "react";

const App = () => {
  const ws = new WebSocket("ws://localhost:8001/'");

  useEffect(() => {
    (() => {
      ws.onopen = (e) => {
        console.log("success");
      };

      ws.onmessage = (e) => {
        console.log("received message", e);
      };

      ws.onclose = (e) => {
        console.log("close", e);
      };
    })();
  }, []);

  const onSendMessage = () => {
    ws.send("hi");
  };

  const onCloseWS = () => {
    ws.close(4000, "그냥");
  };

  return (
    <div>
      <input type="text" placeholder="아이디" />
      <textarea />
      <button onClick={onSendMessage}>send</button>
      <button onClick={onCloseWS}>close</button>
    </div>
  );
};

export default App;
