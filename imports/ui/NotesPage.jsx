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
            currentNotesID: '',
            currentNotesTitle: '',
            currentNotesContent: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notes.length === 0 && prevProps.notes !== this.props.notes) {
            this.setState({
                currentNotesID: this.props.notes[0]._id,
                currentNotesTitle: this.props.notes[0].title,
                currentNotesContent: this.props.notes[0].content  
            });
        }
    }

    onNoteSelect(index) {
        this.setState({
            currentNotesID: this.props.notes[index]._id,
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

    onChangeNote(event) {
        let type = event.target.name;
        let currentNoteType = 'currentNotes' + type[0].toUpperCase() + type.substring(1);
        this.setState({
            [currentNoteType]: event.target.value
        })
    }

    onNoteSave() {
        Meteor.call('notes.save', {
            _id: this.state.currentNotesID,
            title: this.state.currentNotesTitle,
            content: this.state.currentNotesContent
        });
    }

    onNoteDelete() {
        let self = this;
        Meteor.call('notes.delete', {_id: this.state.currentNotesID}, function() {
            if (self.props.notes.length > 0) {
                self.setState({
                    currentNotesID: self.props.notes[0]._id,
                    currentNotesTitle: self.props.notes[0].title,
                    currentNotesContent: self.props.notes[0].content  
                })
            }else {
                self.setState({
                    currentNotesID: '',
                    currentNotesContent: '',
                    currentNotesTitle: ''
                })
            }
        });
    }

    onNoteAdd() {
        let self = this;
        Meteor.call('notes.insert', function(error, result) {
            self.setState({
                currentNotesID: result,
                currentNotesTitle: 'Untitled Note',
                currentNotesContent: ''
            })
        })
    }

    render() {
        return (
            <div className="notes-container">
                <div className="sidebar">
                    <div className="details-container">
                        <img className="name-logo" src="/icons-s.svg"/>
                        <span className="email">{this.state.email}</span>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search all notes.." />
                        <img src="/search.png" />
                    </div>
                    <div className="notes-list">
                        {this.renderNotesList()}
                    </div>
                    <div className="add-notes" onClick={this.onNoteAdd.bind(this)}>
                        <span className="plus">+</span>
                    </div>
                </div>
                <div className="note">
                    {
                        this.props.notes.length > 0 ?
                            <>
                                <div className="header"> 
                                    <input className="title" value={this.state.currentNotesTitle} onChange={this.onChangeNote.bind(this)} name="title" placeholder="Enter Title..." />
                                    <span className="save">
                                        <img src="/save.png" onClick={this.onNoteSave.bind(this)} />
                                    </span>
                                    <span className="delete">
                                        <img src="/delete.png" onClick={this.onNoteDelete.bind(this)} />
                                    </span>
                                </div>
                                <div className="content">
                                    <textarea value={this.state.currentNotesContent} onChange={this.onChangeNote.bind(this)} name="content" placeholder="Enter Content..." >
                                    </textarea>
                                </div>
                            </>
                            : <p className="no-notes">Click on the add icon to start adding notes</p>  
                    }
                </div>
            </div>
        )
    }
}

export default withTracker(() => {
    Meteor.subscribe('notes');
    
    return {
      notes: Notes.find({}).fetch().reverse()
    };
})(NotesPage);