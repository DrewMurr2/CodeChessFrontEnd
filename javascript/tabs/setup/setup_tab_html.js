export const SETUPS_TAB_HTML = /*html*/`
       <h2>Setup</h2>
        <p>Clone this repository:</p> <span><a href="https://github.com" target="_blank" >Drews Chess Game Player Server</a></span>
        <p>Install dependencies:    <i>   npm i</i> </p>

        <p>Change the port (optional) <i>    default 8080</i></p>

        <p>Run the player server:  <i>   npm run dev</i></p>

        <p>Copy the local websocket url from the terminal. default: <i>    ws://localhost:8080</i></p>
        <p>Enter the url below and click connect</p>
          <label for="urlInput">url for ws connection:</label>
     <input type="text" id="urlInput" name="urlInput" value="ws://localhost:8080"> <button id="connectButton">connect</button>
     <br><br>`