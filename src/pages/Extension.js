import React, { useState, useEffect } from "react";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { Divider } from "../components/Divider";
import { Bottom } from "../components/Bottom";
import { Loader } from "../components/Loader";
import { Textarea } from "../components/Textarea";
import { Response } from "../components/Response";
import ChatGPT from "../lib/chatgpt";

function Extension() {
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
        <Container.Outer customStyles={{ backgroundColor: 'lime-700' }} showIcon={true} showHeader={true}>
            <Container.Inner customStyles={{ backgroundColor: '#e0e0e0', padding: 50, borderRadius: '3rem', minHeight: '500px' }}>
                <Button onClick={onClick} text="Scan the comments!" />
                <Textarea onChange={onChange} />
                <Divider />
                {loading ? <Loader /> : <Response response={response} />}
                <Bottom />
            </Container.Inner>
        </Container.Outer>
    );
    
    
}

export default Extension;
