import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NotesService from '../services/NoteService';
import Moment from "react-moment";

const NotesList = () => {

   const [notes, setNotes] = useState([]);

    useEffect(() => {
        const search = async () => {
            const { data } = await NotesService.getAll();
            setNotes(data);
            console.log(data)
        };
        search();
    }, [])

    const renderList = () => {
       return notes && notes.map(note =>
           <div key={note.id} className="notes-preview mt-3">
               <Link to={`/notes/${note.id}`}>
                   <h5 className="primary-color text-capitalize">{note.title}</h5>
                   <Moment fromNow className="text-italic">{note.updatedAt}</Moment>
               </Link>
           </div>
       )
    };

    return (
     <div className="main-content">
         <h4>List of Notes</h4>
         <div className="notes-list mt-4">
             {
                 notes.length > 0 ? renderList() : <div>No notes available.</div>
             }
         </div>
     </div>
    )
}

export default NotesList;