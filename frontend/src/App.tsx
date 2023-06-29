import { useEffect, useRef } from "react";

const App = () => {
  // useRef로 관리하겠습니다
  const webSocket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 재연결을 할지 할지 구분 용도
    let isReconnect = true;

    // 연결 로직
    const connectWebSocket = () => {
      webSocket.current = new WebSocket("ws://localhost:8001/");

      const onConnect = async () => {
        console.log("연결성공");
      };

      const onReceive = async (e: any) => {
        console.log("메시지 수신", e);
      };

      const onDisconnect = () => {
        console.log("연결종료");
        reconnectWebSocket(isReconnect);
      };

      webSocket.current.onopen = onConnect;
      webSocket.current.onmessage = onReceive;
      webSocket.current.onclose = onDisconnect;
    };

    // 재연결 로직
    const reconnectWebSocket = (_isReconnect: boolean) => {
      if (!_isReconnect) return;
      console.log("재연결");
      connectWebSocket();
    };

    connectWebSocket();

    return () => {
      isReconnect = false;
      webSocket.current?.close?.();
      webSocket.current = null;
    };
  }, []);

  const onSendMessage = () => {
    webSocket.current?.send("hi");
  };

  const onCloseWS = () => {
    webSocket.current?.close(4000, "그냥");
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
