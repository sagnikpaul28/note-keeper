import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export class Home extends React.Component {
    render() {
        return (
            <div className="home">
                <div className="row">
                    <div className="col">
                        <p className="title">
                            Your Notes.<br/>
                            Organized.<br/>
                            Effortless.
                        </p>
                        <p className="content">
                            Take notes anywhere. Find information faster. Share ideas with anyone. Meeting notes, web pages, projects, to-do lists—with Evernote as your note taking app, nothing falls through the cracks.
                        </p>
                        <Link to="/" className="link">Sign up</Link>
                    </div>
                    <div className="col">
                        <img src="/screenshot.png" />
                    </div>
                </div>
            </div>
        )
    }
}