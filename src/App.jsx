/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from "react";


function App() {
  /**
 * keep this following data as default data in agenda details as it is required for testing
 * [
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ],
 */

  // your data goes here (state)

  const handelTopics=(e)=>{
    e.preventDefault();
    if(topic.trim().length >0){
      setTopics([...topics, topic])
      setTopic("")
    }
  }

  const [viewMode, setViewMode]= useState(false);

  const [title,setTitle]= useState("")
  const [description, setDescription]= useState("")
  const [topic, setTopic]= useState("")
  const [topics, setTopics]= useState([]);
  const [agendas, setAgendas]= useState([
    {
      title: "Angular",
      description: "Some description about the angular",
      topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
    },
    {
      title: "Vue",
      description: "Some description about the vue",
      topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
    },
  ])


  // your methods goes here
  const handelSubmit=(e)=>{
  e.preventDefault();
  if(title.trim() && description.trim() && topics.length > 0 ){
    const newAgendas ={
    title,
    description,
    topics
  }
  setAgendas([...agendas, newAgendas])
  setTitle("")
  setDescription("")
  setTopics([])
}
  }

  return (
    <div>
      <h1 className="mx-5 mb-5">Agenda Manager</h1>
      {/* show/hide this following add agenda template */}
      {!viewMode ? (
        <div className="container" role="addAgenda">
        <button className="btn btn-info" role="goToView" onClick={()=>setViewMode(true)}>
          Click To View Agenda
        </button>
        <form>
          <div className="my-3">
            <label className="form-label">Title</label>
            {/* title */}
            <input
              type="text"
              name="newTitle"
              placeholder="Enter the title"
              className="form-control"
              role="inputTitle"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
            />

            <small className="text-danger" data-testid="invalidTitle" >
              {
                title.trim().length===0 ? "Title is required": ""
              /**
               * show empty string if title input is valid
               * else show 'Title is required'
               */
              }
            </small>
          </div>
          <div className="my-3">
            <label className="form-label">Description</label>
            {/* description */
             }
            <input
              type="text"
              name="newDescription"
              placeholder="Enter the description"
              className="form-control"
              role="inputDescription"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />

            <small className="text-danger" data-testid="invalidDescription">
              {description.trim().length===0 ? "Description is required" : ""
              /**
               * show empty string if description input is valid
               * else show 'Title is required'
               */
               }
            </small>
          </div>
          <div className="my-3 w-50">
            <label className="form-label">Enter topic</label>
            {/* topic */}
            <input
              type="text"
              name="newTopic"
              placeholder="Enter the topic"
              className="form-control"
              role="inputTopic"
              value={topic}
              onChange={(e)=>setTopic(e.target.value)}
            />

            <small className="text-danger" data-testid="invalidTopic">
              {topic.trim().length===0 ?  "Topic is required" : ""
              /**
               * show empty string if topic input is valid
               * else show 'Topic is required'
               */}
            </small>
          </div>
          {/* on click should add topics and disable the button if invalid topic */}
          <button className="btn btn-success addAlign" role="addTopicBtn" onClick={handelTopics} disabled={topic.trim().length===0}>
            + Add Topic
          </button>
          {/* on click should add agenda details and disable the button if invalid inputs */}
          <button
            className="btn btn-success submitAlign"
            role="submitAgendaBtn"
            onClick={handelSubmit}
            disabled={!title.trim() || !description.trim() || topics.length===0}
          >
            Submit Agenda
          </button>
        </form>
        {/* show if no topics added yet */}
        <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
          No Topics Added
        </div>
        {/* display the list of topics added using li */}
        <div className="card my-3">
          <div className="card-header">Added Topics</div>
          <div className="card-body">
            <ul className="list-group">
              {topics.length>0 ? (
                topics.map((t, index)=>(
                  <li key={index} className="list-group-item" role="topicList">
                {t}
              </li>
                ))
              )
              :(
                <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
      No Topics Added
    </div>
              )}
              
            </ul>
          </div>
          <div className="card-footer">Refer the topics you added</div>
        </div>
      </div>
      )
      :(
        <div className="container" role="viewAgenda">
        <button className="btn btn-info" role="goToAdd" onClick={()=> setViewMode(false)}>
          Click To Add Agenda
        </button>
        {/* iterate the agenda details to display */}
        {agendas.length>0 ? (
        agendas.map((agendas, index)=>(

        <div key={index} className="card my-3" role="cards">
          <div className="card-header">{agendas.title}</div>
          <div className="card-body">
            <ul className="list-group">
            {agendas.topics.map((t, index)=>(
            <li key={index} className="list-group-item">
                {t}
              </li>
            ))}
              {/* iterate the topics to display */}
              
            </ul>
          </div>
          <div className="card-footer">{agendas.description}</div>
        </div>
        ))
        
        ) 
        : (
        <div>No agendas available</div>
        )}
        
      </div>
      )}
      
    </div>
  );

}

export default App;
