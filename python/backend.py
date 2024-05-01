from fastapi import FastAPI, WebSocket
import asyncio

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
	await websocket.accept()
	global i
	i = 0

	async def send_messages():
		while True:
			global i
			i += 1
			await websocket.send_text(f"{i}")
			await asyncio.sleep(0.1)

	async def receive_messages():
		while True:
			global i
			await websocket.receive_text()
			i = 0
			await websocket.send_text(f"{i}")

	sender = asyncio.create_task(send_messages())
	receiver = asyncio.create_task(receive_messages())

	await asyncio.gather(sender, receiver)