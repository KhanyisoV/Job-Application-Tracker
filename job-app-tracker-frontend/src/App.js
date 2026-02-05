import {useEffect , useState} from "react";
import './App.css';

function App() {

  {/*For The jobapplication Tracker dashboard */}
  const apiUrl = "https://jobtracker-backend-f7bxc9fyg4htendh.southafricanorth-01.azurewebsites.net/api/JobApplication";

  const apiInterviewUrl = "https://jobtracker-backend-f7bxc9fyg4htendh.southafricanorth-01.azurewebsites.net/api/Interview";

  const apiInterviewPrepUrl = "https://jobtracker-backend-f7bxc9fyg4htendh.southafricanorth-01.azurewebsites.net/api/InterviewPrep";
  const [applications, setApplications] = useState([]);
  const [name,setName] = useState("");
  const [status,setStatus] = useState("Awaiting");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [sortBy, setSortBy] = useState("none");

  {/*for Interview section*/}
  const [interviews, setInterviews] = useState([]);
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [editingInterviewId, setEditingInterviewId] = useState(null);

  {/*for interview preparation*/}
  const [activePrepTab, setActivePrepTab] = useState("resources");
  const [prepContent, setPrepContent] = useState("");
  const [prepNotes, setPrepNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");

  
  {/*for Tab Navigation*/}
  const [activeTab, setActiveTab] = useState("applications");
  

  {/* Fetch interviews on component mount */}
  useEffect(() => {
    fetch(apiInterviewUrl + "/interview").then(response => response.json())
      .then(data => setInterviews(data))
      .catch(err => console.error(err));
  }, []);
  
  {/* Fetch applications on component mount */}
  useEffect(() => {
    fetch(apiUrl).then(response => response.json())
    .then(data => setApplications(data))
    .catch(error => console.error(error));
  }, []);

  {/* Fetch interview preparation content on component mount */}
  useEffect(() => {
    fetch(apiInterviewPrepUrl + "/interview-preps").then(response => response.json())
      .then(data => setSavedNotes(data))
      .catch(err => console.error(err));
  }, []);

 {/*Interview prep*/}

 function createPrepNote() {
  fetch(apiInterviewPrepUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: Question,
      notes: Answer
    })
  })
  .then(res => res.json())
  .then(data => {
    setSavedNotes([...savedNotes, data]);
    setQuestion("");
    setAnswer("");
  })
  .catch(err => console.error(err));
}

function deletePrepNote(id) {
  fetch(`${apiInterviewPrepUrl}/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    setSavedNotes(savedNotes.filter(note => note.id !== id));
  })
  .catch(err => console.error(err));
}

function updatePrepNote(id) {
  fetch(`${apiInterviewPrepUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      content: Question,
      notes: Answer
    })
  })
  .then(() => {
    setSavedNotes(savedNotes.map(note => 
      note.id === id 
        ? {...note, content: Question, notes: Answer} 
        : note
    ));
    setQuestion("");
    setAnswer("");
    setEditingInterviewId(null);
  })
  .catch(err => console.error(err));
}

function startEditPrepNote(note) {
  setQuestion(note.content);
  setAnswer(note.notes);
  setEditingInterviewId(note.id);
}

function cancelEditPrepNote() {
  setQuestion("");
  setAnswer("");
  setEditingInterviewId(null);
} 


{/*Job application functions*/}
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

 {/* Interview section functions */}
function scheduleInterview() {
  fetch(apiInterviewUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: interviewDate,
      time: interviewTime,
      location: interviewLocation,
      notes: interviewNotes
    })
  })
  .then(res => res.json())
  .then(data => {
    setInterviews([...interviews, data]);
    setInterviewDate("");
    setInterviewTime("");
    setInterviewLocation("");
    setInterviewNotes("");
  })
  .catch(err => console.error(err));
}

function cancelInterview(id) {
  fetch(`${apiInterviewUrl}/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  })
  .catch(err => console.error(err));
}     

function updateInterview(id) {
  fetch(`${apiInterviewUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date: interviewDate,
      time: interviewTime,
      location: interviewLocation,
      notes: interviewNotes
    })
  })
  .then(() => {
    setInterviews(interviews.map(interview => 
      interview.id === id 
        ? {...interview, date: interviewDate, time: interviewTime, location: interviewLocation, notes: interviewNotes} 
        : interview
    ));
    setInterviewDate("");
    setInterviewTime("");
    setInterviewLocation("");
    setInterviewNotes("");
    setEditingInterviewId(null);
  })
  .catch(err => console.error(err));
}

function startEditInterview(interview) {
  setInterviewDate(interview.date);
  setInterviewTime(interview.time);
  setInterviewLocation(interview.location);
  setInterviewNotes(interview.notes);
  setEditingInterviewId(interview.id);
}

function cancelEditInterview() {
  setInterviewDate("");
  setInterviewTime("");
  setInterviewLocation("");
  setInterviewNotes("");
  setEditingInterviewId(null);
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
      
      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === "applications" ? "active" : ""}`}
          onClick={() => setActiveTab("applications")}
        >
          Applications
        </button>
        <button 
          className={`tab-button ${activeTab === "interviews" ? "active" : ""}`}
          onClick={() => setActiveTab("interviews")}
        >
          Interviews
        </button>

         <button 
          className={`tab-button ${activeTab === "interview-prep" ? "active" : ""}`}
          onClick={() => setActiveTab("interview-prep")}
        >
          Interview Prep
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === "applications" && (
        <div className="tab-content">
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
                <h3>{application.name}</h3>
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
      )}

      {/* Interview Prep Tab */}
      {activeTab === "interview-prep" && (
        <div className="tab-content">
          <h2>Interview Preparation</h2>
          <p>Prepare for your upcoming interviews with our resources and tips.</p>
      
        <input
          type="text"
          placeholder="Preparation Question"
          value={Question}
          onChange={e => setQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Answer"
          value={Answer}
          onChange={e => setAnswer(e.target.value)}
        />

        {editingInterviewId ? (
          <>
            <button onClick={() => updatePrepNote(editingInterviewId)}>Update Note</button>
            <button onClick={cancelEditPrepNote}>Cancel</button>
          </>
        ) : (
          <button onClick={createPrepNote}>Save Note</button>
        )}
        
        <ul>
          {savedNotes.map(note => (
            <li key={note.id}>
              <h3>{note.content}</h3>
              <p>Answer: {note.notes}</p>
              <button onClick={() => startEditPrepNote(note)}>Edit</button>
              <button onClick={() => deletePrepNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>

        
        </div>
        
        
      )}

      {/* Interviews Tab */}
      {activeTab === "interviews" && (
        <div className="tab-content">
          <h2>{editingInterviewId ? "Update" : "Schedule"} Interview</h2>

          <input
            type="date"
            placeholder="Interview Date"
            value={interviewDate}
            onChange={e => setInterviewDate(e.target.value)}
          />
          <input
            type="time"
            placeholder="Interview Time"
            value={interviewTime}
            onChange={e => setInterviewTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={interviewLocation}
            onChange={e => setInterviewLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Notes"
            value={interviewNotes}
            onChange={e => setInterviewNotes(e.target.value)}
          />

          {editingInterviewId ? (
            <>
              <button onClick={() => updateInterview(editingInterviewId)}>Update Interview</button>
              <button onClick={cancelEditInterview}>Cancel</button>
            </>
          ) : (
            <button onClick={scheduleInterview}>Schedule Interview</button>
          )}

          <ul>
            {interviews.map(interview => (
              <li key={interview.id}>
                <h3>{new Date(interview.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                <h4>{interview.time}</h4>
                <p>Location: {interview.location}</p>
                <p>Notes: {interview.notes}</p>
                <button onClick={() => startEditInterview(interview)}>Edit</button>
                <button onClick={() => cancelInterview(interview.id)}>Cancel</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;