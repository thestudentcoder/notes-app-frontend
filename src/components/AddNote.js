import React, { useState } from 'react';
import { useHistory } from 'react-router';
import NoteService from "../services/NoteService";

const AddNote = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('programming');
    const history = useHistory();

    const saveNote = (e) => {
        e.preventDefault();
        const note = {title, body, category}
        console.log('printing node', note);
        postNote(note);
    }

    const postNote = async (note) => {
        const response = await NoteService.create(note);

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            console.log("note added successfully.")
            history.push("/");
        }
    }

    return (
        <div className="create">
            <form>
                <div className="form-group">
                    <label htmlFor="body">Note Title: <sup>*</sup></label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Note Description: <sup>*</sup></label>
                    <textarea
                        id="body"
                        className="form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Note Category:</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="programming">Programming</option>
                        <option value="vacation">Vacation</option>
                        <option value="meeting">Meeting</option>
                        <option value="blogging">Blogging</option>

                    </select>
                </div>
                <div className="text-center">
                    <button onClick={(e) => saveNote(e)}>Add note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote;