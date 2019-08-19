import React from "react";

export class Notes extends React.Component {
    render() {
        return (
            <div className="notes-container">
                <div className="sidebar">
                    <div className="details-container">
                        {/* <img src="" /> */}
                        <span>sagnikpaul2882@gmail.com</span>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search all notes.." />
                        {/* <img src="" /> */}
                    </div>
                    <div className="notes-list">
                        <div className="item">
                            {/* <img src="" /> */}
                            <p>My First Note</p>
                        </div>
                        <div className="item">
                            {/* <img src="" /> */}
                            <p>My Second Note</p>
                        </div>
                        <div className="item">
                            {/* <img src="" /> */}
                            <p>My Third Note</p>
                        </div>
                        <div className="item">
                            {/* <img src="" /> */}
                            <p>My Fourth Note</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}