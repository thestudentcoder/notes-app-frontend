import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import NoteService from "../services/NoteService";

const AddNote = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('programming');
    const history = useHistory();
    const { id } = useParams();

    const saveNote = (e) => {
        e.preventDefault();
        const note = {title, body, category, id}
        console.log('printing node', note);
        if (id) {
            updateNote(note)
        } else {
            postNote(note);
        }
    }

    const postNote = async (note) => {
        const response = await NoteService.create(note)
            .catch(error => console.log("something went wrong", error));

        console.log("note added successfully.")
        history.push("/");
    }

    const updateNote = async (note) => {
        const response = await NoteService.update(note)
            .catch(error => console.log("something went wrong", error));

        console.log("note updated successfully.")
        history.push("/");
    }

    useEffect(() => {
        if (id) {
            const fetchNote = async () => {
                const { data } = await NoteService.get(id).catch(error => console.log("Something went wrong", error));
                setTitle(data.title);
                setBody(data.body);
                setCategory(data.category);
            }
            fetchNote();
        }
    }, [])

    return (
        <div className="create">
            <div className="text-center">
                <h5>{id ? "Update a Note" : "Add a New Note"}</h5>
            </div>
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
                    <button onClick={(e) => saveNote(e)}>
                        {id ? "Update Note" : "Add Note"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNote;