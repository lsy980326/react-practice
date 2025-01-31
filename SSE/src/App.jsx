import React, { useEffect, useState } from "react";

const Monitoring = () => {
    const [data, setData] = useState([]); // 데이터 상태
    const [latestData, setLatestData] = useState(null); // 최신 데이터 표시용
    const [updateCount, setUpdateCount] = useState(0); // 갱신 횟수
    const [isConnected, setIsConnected] = useState(false); // SSE 연결 상태
    const [lastUpdateTime, setLastUpdateTime] = useState(null); // 마지막 업데이트 시간
    const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간

    useEffect(() => {
        // 경과 시간을 계산하는 타이머 설정
        const timer = setInterval(() => {
            if (lastUpdateTime) {
                const currentTime = new Date().getTime();
                const elapsed = Math.floor((currentTime - lastUpdateTime) / 1000);
                setElapsedTime(elapsed);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [lastUpdateTime]);

    useEffect(() => {
      const eventSource = new EventSource("http://localhost:9001/api/v1/sse/subscribe");
  
      eventSource.addEventListener("initial", (event) => {
          const initialData = JSON.parse(event.data);
          console.log("Initial Data Received:", initialData);
          setData((prevData) => [...prevData, initialData]);
          setLatestData(initialData);
          setUpdateCount((prevCount) => prevCount + 1);
          setIsConnected(true);
          setLastUpdateTime(new Date().getTime());
      });
  
      eventSource.addEventListener("monitoring", (event) => {
          const updatedData = JSON.parse(event.data);
          console.log("Update Data Received:", updatedData);
          setData((prevData) => [...prevData, updatedData]);
          setLatestData(updatedData);
          setUpdateCount((prevCount) => prevCount + 1);
          setLastUpdateTime(new Date().getTime());
      });
  
      eventSource.onerror = (error) => {
          console.error("SSE connection error:", error);
          eventSource.close();
      };
  
      return () => {
          console.log("SSE connection closed");
          eventSource.close();
      };
  }, []); // 빈 배열로 설정
    
    return (
        <div>
            <h1>Monitoring Data</h1>

            {/* 갱신 횟수 표시 */}
            <div style={{ marginBottom: "20px", fontSize: "18px" }}>
                <strong>Update Count:</strong> {updateCount}
            </div>

            {/* SSE 연결 상태 표시 */}
            <div style={{ marginBottom: "20px", fontSize: "18px" }}>
                <strong>SSE Connection:</strong> {isConnected ? "O" : "X"}
            </div>

            {/* 마지막 업데이트 시간과 경과 시간 표시 */}
            <div style={{ marginBottom: "20px", fontSize: "18px" }}>
                <strong>Last Update:</strong> {lastUpdateTime ? new Date(lastUpdateTime).toLocaleTimeString() : '-'}
                {lastUpdateTime && <span> ({elapsedTime}초 전)</span>}
            </div>

            {/* 최신 데이터 섹션 */}
            {latestData && (
                <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid black" }}>
                    <h2>Latest Data</h2>
                    <pre>{JSON.stringify(latestData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Monitoring;
