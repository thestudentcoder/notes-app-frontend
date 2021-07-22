import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router";
import NoteService from "../services/NoteService";
import Moment from "react-moment";

const NoteDetails = () => {
    const { id } = useParams();
    const[currentNote, setCurrentNote] = useState('');
    const history = useHistory();

    useEffect(() => {
        const fetchNote = async () => {
            const response = await NoteService.get(id);

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                setCurrentNote(response.data);
            }
        }
        fetchNote(id);
    }, []);

    const handleDelete = async () => {
        const response = await NoteService.remove(id).catch(error => console.log("Something went wrong", error))
        history.push("/");
    }

    const handleEdit = () => {
        history.push(`/notes/edit/${id}`);
    }

    return (
        <div>
            <div className="note-details main-content">
                {
                    currentNote &&
                    <div>
                        <article>
                            <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
                            <div className="mb-3 font-italic metadata">
                                <Moment fromNow>{currentNote.updatedAt}</Moment>
                                <span className="text-capitalize">, {currentNote.category}</span>
                            </div>
                            <div className="mb-3">
                                {currentNote.body}
                            </div>
                        </article>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete} className="ml-3">Delete</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NoteDetails;