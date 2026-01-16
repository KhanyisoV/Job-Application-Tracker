import {useEffect , useState} from "react";
import './App.css';

function App() {

  const apiUrl = "http://localhost:5271/api/JobApplication";
  const [applications, setApplications] = useState([]);
  const [name,setName] = useState("");
  const [status,setStatus] = useState("Awaiting");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); // Track which item is being edited
  const [sortBy, setSortBy] = useState("none");

  
  useEffect(() => {
    fetch(apiUrl).then(response => response.json())
    .then(data => setApplications(data))
    .catch(error => console.error(error));
  }, []);


 function createApplication() {
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      status: status,
      jobDescription: description,
      appliedDate: new Date().toISOString()
    })
  })
  .then(res => res.json())
  .then(data => {
    setApplications([...applications, data]);
    setName("");
    setStatus("Awaiting");
    setDescription("");
  })
  .catch(err => console.error(err));
}

function deleteApplication(id) {
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    setApplications(applications.filter(app => app.jobId !== id));
  })
  .catch(err => console.error(err));
}

function updateApplication(id) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      status: status,
      jobDescription: description
    })
  })
  .then(() => {
    setApplications(applications.map(app => 
      app.jobId === id 
        ? {...app, name: name, status: status, jobDescription: description} 
        : app
    ));
    setName("");
    setStatus("Awaiting");
    setDescription("");
    setEditingId(null);
  })
  .catch(err => console.error(err));
}

function startEdit(application) {
  setEditingId(application.jobId);
  setName(application.name);
  setStatus(application.status);
  setDescription(application.jobDescription);
}

function cancelEdit() {
  setEditingId(null);
  setName("");
  setStatus("Awaiting");
  setDescription("");
}
const getStatusStyle = (status) => {
  switch(status) {
    case 'Accepted':
      return {
        background: 'rgba(34, 197, 94, 0.1)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        color: '#15803d'
      };
    case 'Rejected':
      return {
        background: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        color: '#b91c1c'
      };
    case 'Awaiting':
      return {
        background: 'rgba(251, 191, 36, 0.1)',
        borderColor: 'rgba(251, 191, 36, 0.3)',
        color: '#b45309'
      };
    default:
      return {};
  }
};
const getSortedApplications = () => {
  const sorted = [...applications];
  
  switch(sortBy) {
    case 'name-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'status-asc':
      // Accepted -> Awaiting -> Rejected
      const orderAsc = { 'Accepted': 1, 'Awaiting': 2, 'Rejected': 3 };
      sorted.sort((a, b) => (orderAsc[a.status] || 4) - (orderAsc[b.status] || 4));
      break;
    case 'status-desc':
      // Rejected -> Awaiting -> Accepted
      const orderDesc = { 'Rejected': 1, 'Awaiting': 2, 'Accepted': 3 };
      sorted.sort((a, b) => (orderDesc[a.status] || 4) - (orderDesc[b.status] || 4));
      break;
    default:
      return sorted;
  }
  
  return sorted;
};


  return (
    <div className="App">
      <h1>Job Application Tracker</h1>

      <h2>Welcome to the Job Application Tracker!</h2>
      <p>This is a simple application to help you track your job applications.</p>
      <h2>{editingId ? "Update" : "Create"} Job Application</h2>

      <input
        type="text"
        placeholder="Position Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select value={status} onChange={e => setStatus(e.target.value)}> 
        <option value="">Select Status</option>
        <option value="Accepted">Accepted</option> 
        <option value="Rejected">Rejected</option> 
        <option value="Awaiting">Awaiting</option> 
      </select>
      
      {editingId ? (
        <>
          <button onClick={() => updateApplication(editingId)}>Update</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={createApplication}>Create</button>
      )}

       {/* ADD THIS ENTIRE DIV: */}
      <div className="sort-container">
        <label htmlFor="sort-select">Sort by:</label>
        <select 
          id="sort-select"
          className="sort-select"
          value={sortBy} 
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="none">None</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="status-asc">Status (Accepted → Awaiting → Rejected)</option>
          <option value="status-desc">Status (Rejected → Awaiting → Accepted)</option>
        </select>
      </div>

      <ul>
        {getSortedApplications().map(application => (
          <li key={application.jobId}>
            <h3>{application.name} </h3>
            <h4>{application.jobDescription}</h4>
            <p style={getStatusStyle(application.status)}>
              Status: {application.status}
            </p>
            <p>Applied on: {application.appliedDate ? 
                                new Date(application.appliedDate).toLocaleDateString() : 
                                'N/A'
                            }</p>
            <button onClick={() => startEdit(application)}>Edit</button>
            <button onClick={() => deleteApplication(application.jobId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  
}

export default App;