import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import NoteService from "../services/NoteService";

const NoteDetails = () => {
    const { id } = useParams();
    const[currentNote, setCurrentNote] = useState('');

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
    }, [])

    return (
        <div>
            <div className="note-details main-content">
                <article>
                    <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
                    <div className="mb-3 font-italic metadata">
                        <span>{currentNote.updatedAt}</span>
                        <span className="text-capitalize">, {currentNote.category}</span>
                    </div>
                    <div className="mb-3">
                        {currentNote.body}
                    </div>
                </article>
            </div>
        </div>
    )
}

export default NoteDetails;