function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  function addNote() {
    const title = document.getElementById('noteTitle').value.trim();
    const content = document.getElementById('noteContent').value.trim();
    const color = document.getElementById('noteColor').value;
    const pinned = document.getElementById('notePin').checked;
    const tags = document.getElementById('noteTags').value.trim().split(',').map(tag => tag.trim());
    const reminder = document.getElementById('noteReminder').value;
    const createdAt = new Date().toISOString();
  
    if (!title || !content) {
      alert('Tytuł i treść notatki są wymagane!');
      return;
    }
  
    const newNote = {
      id: generateId(),
      title: title,
      content: content,
      color: color,
      pinned: pinned,
      tags: tags,
      reminder: reminder,
      createdAt: createdAt,
      todo: []
    };
  
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    notes.push(newNote);
  
    localStorage.setItem('notes', JSON.stringify(notes));
  
    displayNotes();
  }
  
  function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    notes = notes.filter(note => note.id !== id);
  
    localStorage.setItem('notes', JSON.stringify(notes));
  
    displayNotes();
  }
  
  function addTodoItem(noteId, item) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let note = notes.find(note => note.id === noteId);
    if (note) {
      note.todo.push({ text: item, done: false });
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    }
  }
  
  function toggleTodoItem(noteId, itemIndex) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let note = notes.find(note => note.id === noteId);
    if (note && note.todo[itemIndex]) {
      note.todo[itemIndex].done = !note.todo[itemIndex].done;
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
    }
  }
  
  function displayNotes(query = '') {
    const notesContainer = document.getElementById('noteList');
    notesContainer.innerHTML = '';
  
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    if (query) {
      notes = notes.filter(note =>
        note.title.includes(query) ||
        note.content.includes(query) ||
        note.tags.some(tag => tag.includes(query))
      );
    }
  
    notes.sort((a, b) => b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt));
  
    notes.forEach(note => {
      const noteElem = document.createElement('div');
      noteElem.classList.add('note');
      noteElem.style.backgroundColor = note.color;
  
      const titleElem = document.createElement('h3');
      titleElem.textContent = note.title;
  
      const contentElem = document.createElement('p');
      contentElem.textContent = note.content;
  
      const tagsElem = document.createElement('p');
      tagsElem.textContent = 'Tagi: ' + note.tags.join(', ');
  
      const reminderElem = document.createElement('p');
      reminderElem.textContent = note.reminder ? `Przypomnienie: ${new Date(note.reminder).toLocaleString()}` : '';
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Usuń';
      deleteButton.onclick = () => deleteNote(note.id);
  
      const todoList = document.createElement('ul');
      note.todo.forEach((item, index) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = item.text;
        todoItem.style.textDecoration = item.done ? 'line-through' : 'none';
        todoItem.onclick = () => toggleTodoItem(note.id, index);
        todoList.appendChild(todoItem);
      });
  
      const todoInput = document.createElement('input');
      todoInput.type = 'text';
      todoInput.placeholder = 'Nowe zadanie';
      const todoButton = document.createElement('button');
      todoButton.textContent = 'Dodaj';
      todoButton.onclick = () => {
        const item = todoInput.value.trim();
        if (item) {
          addTodoItem(note.id, item);
        }
      };
  
      noteElem.appendChild(titleElem);
      noteElem.appendChild(contentElem);
      noteElem.appendChild(tagsElem);
      noteElem.appendChild(reminderElem);
      noteElem.appendChild(deleteButton);
      noteElem.appendChild(todoList);
      noteElem.appendChild(todoInput);
      noteElem.appendChild(todoButton);
  
      notesContainer.appendChild(noteElem);
    });
  
    checkReminders();
  }
  
  function searchNotes() {
    const query = document.getElementById('searchQuery').value.trim();
    displayNotes(query);
  }
  
  function checkReminders() {
    const now = new Date().toISOString();
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
      if (note.reminder && note.reminder < now && !note.reminderShown) {
        alert(`Przypomnienie: ${note.title}`);
        note.reminderShown = true;
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  
  displayNotes();