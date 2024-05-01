console.log("Hello from background.js!");

function connect() {
	const ws = new WebSocket("ws://localhost:8000/ws");

	function sendMessage() {
		ws.send("clicked");
		chrome.action.setBadgeText({text: "0"});
	}

	function reConnect() {
		setTimeout(() => {
			chrome.action.onClicked.removeListener(sendMessage);
			connect();
		}, 1000);
	}

	ws.addEventListener("message", (e) => {
		chrome.action.setBadgeText({
			text: e.data
		});
	});

	ws.addEventListener("close", reConnect);
	ws.addEventListener("error", reConnect);

	chrome.action.onClicked.addListener(sendMessage);
}

connect();