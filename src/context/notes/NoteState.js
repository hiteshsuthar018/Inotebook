import noteContext from "./noteContext";
import React, { useState, useEffect } from "react"; // Import useEffect

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get the token from localStorage once during component initialization
  const token = localStorage.getItem('token');

  // get notes
  const getNotes = async () => {
    // API Calling
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // Use the token here
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Calling
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // Use the token here
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes((prevNotes) => prevNotes.concat(note)); // Use the callback function
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Calling
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // Use the token here
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Calling
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token, // Use the token here
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // eslint-disable-next-line
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in the client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  useEffect(() => {
    // Fetch notes initially when the component mounts
    getNotes();
  }, []); // Empty dependency array to fetch notes once during component initialization

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
