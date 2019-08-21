import React from "react";
import { withTracker } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';

class NotesPage extends React.Component {
    constructor(props) {
        super(props);

        let email = localStorage.getItem('email');
        if (!email) {
            this.props.history.replace('/');
            return;
        }

        this.state = {
            email: email,
            currentNotesTitle: '',
            currentNotesContent: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notes.length === 0 && prevProps.notes !== this.props.notes) {
            this.setState({
                currentNotesTitle: this.props.notes[0].title,
                currentNotesContent: this.props.notes[0].content  
            });
        }
    }

    onNoteSelect(index) {
        console.log(index);
        this.setState({
            currentNotesTitle: this.props.notes[index].title,
            currentNotesContent: this.props.notes[index].content  
        })
    }

    renderNotesList() {
        return this.props.notes.map((note, index) => {
            return <div className="item" key={note._id} onClick={this.onNoteSelect.bind(this, index)}>
                <img src="/notes.svg" />
                <p>{note.title}</p>
            </div>
        });
    }

    render() {
        return (
            <div className="notes-container">
                <div className="sidebar">
                    <div className="details-container">
                        <img className="name-logo" src="/icons-s.svg"/>
                        <span className="email">sagnikpaul2882@gmail.com</span>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search all notes.." />
                        <img src="/search.png" />
                    </div>
                    <div className="notes-list">
                        {this.renderNotesList()}
                    </div>
                    <div className="add-notes">
                        <span className="plus">+</span>
                    </div>
                </div>
                <div className="note">
                    <div className="header">
                        <p className="title">
                            {this.state.currentNotesTitle}
                        </p>
                    </div>
                    <div className="content">
                        <p>
                            {this.state.currentNotesContent}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('notes');
    
    return {
      notes: Notes.find({}, { sort: { createdAt: -1 } }).fetch()
    };
})(NotesPage);