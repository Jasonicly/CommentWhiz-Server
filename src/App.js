import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "./components/Container";
import { Button } from "./components/Button";
import { Divider } from "./components/Divider";
import { Bottom } from "./components/Bottom";
import { Loader } from "./components/Loader";
import { Textarea } from "./components/Textarea";
import { Response } from "./components/Response";
import ChatGPT from "./lib/chatgpt";

function App() {
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState("");
	const [prompt, setPrompt] = useState("");

	useEffect(() => {}, [loading, response, prompt]);

	const getChatGPTResponse = async () => {
		setLoading(true);
		setResponse("");
		try {
			const resp = await new ChatGPT(prompt).getCompletion(prompt);
			setResponse(resp);
			setLoading(false);
		} catch (error) {
			setResponse(error);
			setLoading(false);
		}
	};

	const onClick = () => {
		getChatGPTResponse();
	};

	const onChange = (event) => {
		setPrompt(event.target.value);
	};

	return (
		<Container.Outer>
			<Container.Inner>
				<Button onClick={onClick} />
				<Textarea onChange={onChange} />
				<Divider />
				{loading ? <Loader /> : <Response response={response} />}
				<Bottom />
			</Container.Inner>
		</Container.Outer>
	);
}

export default App;
