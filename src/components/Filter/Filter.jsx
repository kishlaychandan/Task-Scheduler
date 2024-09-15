import React, { useState } from 'react';
import './Filter.css';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { IoFilterSharp } from 'react-icons/io5';

function Filter() {
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  const [selectedSchedule, setSelectedSchedule] = useState('minute'); // State to track selected schedule type
  const [taskData, setTaskData] = useState({
    name: '',
    email: '',
    minute: '*',
    hour: '*',
    dayOfMonth: '*',
    month: '*',
    dayOfWeek: '*',
    expiry: '',
    message: '',
  }); // State to hold form data

  // Function to handle form data change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle task creation and sending data to backend
  async function create() {
    let cronExpression = '';

    // Create the cron expression based on the selected schedule type
    if (selectedSchedule === 'minute') {
      cronExpression = `${taskData.minute}`;
    } else if (selectedSchedule === 'hour') {
      cronExpression = `${taskData.minute} ${taskData.hour}`;
    } else if (selectedSchedule === 'dayOfMonth') {
      cronExpression = `${taskData.minute} ${taskData.hour} ${taskData.dayOfMonth}`;
    } else if (selectedSchedule === 'specificDate') {
      cronExpression = `${taskData.minute} ${taskData.hour} ${taskData.dayOfMonth} ${taskData.month}`;
    }

    // Console log the task data before submitting
    console.log({
      name: taskData.name,
      email: taskData.email,
      schedule: cronExpression,
      expiry: taskData.expiry,
      message: taskData.message,
    });

    try {
      const res = await fetch('http://localhost:3000/tasks', {  // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: taskData.name,
          email: taskData.email,
          schedule: cronExpression, // Cron expression created from form input
          expiry: taskData.expiry, // Expiry timestamp
          message: taskData.message,
        }),
      });

      if (res.ok) {
        alert('Task created successfully!');
        // Reset the form data and close the form after submission
        setTaskData({
          name: '',
          email: '',
          minute: '*',
          hour: '*',
          dayOfMonth: '*',
          month: '*',
          dayOfWeek: '*',
          expiry: '',
          message: '',
        });
        setShowForm(false); // Close form after submission
      } else {
        alert('Error creating task');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  }

  return (
    <div className="filter-container">
      <div className="filter">
        <div className="search">
          <input type="text" placeholder="Search" />
        </div>
        <div className="task">
          <div className="sort" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <IoFilterSharp /> Filter
          </div>
          <div className="create">
            <button onClick={() => setShowForm(true)}>+ Create</button>
          </div>
          <div className="export" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaCloudDownloadAlt /> Export
          </div>
        </div>
      </div>

      {/* Conditional rendering for the form */}
      {showForm && (
        <div className="form">
          <h3>Create Task</h3>

          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={taskData.name}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Notification Email"
              value={taskData.email}
              onChange={handleInputChange}
            />
          </label>

          {/* Dropdown or radio button to select schedule type */}
          <label>
            Schedule Type:
            <select value={selectedSchedule} onChange={(e) => setSelectedSchedule(e.target.value)}>
              <option value="minute">Every {`minute`}</option>
              <option value="hour">Every day at {`hour:minute`}</option>
              <option value="dayOfMonth">On {`date`} of the month at {`hour:minute`}</option>
              <option value="specificDate">On {`date`} {`month`} at {`hour:minute`}</option>
            </select>
          </label>

          {/* Show inputs based on selected schedule type */}
          {selectedSchedule === 'minute' && (
            <>
              <label>
                Minute (0-59):
                <select
                  name="minute"
                  value={taskData.minute}
                  onChange={handleInputChange}
                >
                  <option value="*">Every minute (*)</option>
                  {[...Array(60).keys()].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {selectedSchedule === 'hour' && (
            <>
              <label>
                Hour (0-23):
                <select
                  name="hour"
                  value={taskData.hour}
                  onChange={handleInputChange}
                >
                  {[...Array(24).keys()].map((hr) => (
                    <option key={hr} value={hr}>
                      {hr}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Minute (0-59):
                <select
                  name="minute"
                  value={taskData.minute}
                  onChange={handleInputChange}
                >
                  {[...Array(60).keys()].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {selectedSchedule === 'dayOfMonth' && (
            <>
              <label>
                Day of Month (1-31):
                <select
                  name="dayOfMonth"
                  value={taskData.dayOfMonth}
                  onChange={handleInputChange}
                >
                  {[...Array(31).keys()].map((day) => (
                    <option key={day} value={day + 1}>
                      {day + 1}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Hour (0-23):
                <select
                  name="hour"
                  value={taskData.hour}
                  onChange={handleInputChange}
                >
                  {[...Array(24).keys()].map((hr) => (
                    <option key={hr} value={hr}>
                      {hr}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Minute (0-59):
                <select
                  name="minute"
                  value={taskData.minute}
                  onChange={handleInputChange}
                >
                  {[...Array(60).keys()].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          {selectedSchedule === 'specificDate' && (
            <>
              <label>
                Day of Month (1-31):
                <select
                  name="dayOfMonth"
                  value={taskData.dayOfMonth}
                  onChange={handleInputChange}
                >
                  {[...Array(31).keys()].map((day) => (
                    <option key={day} value={day + 1}>
                      {day + 1}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Month (1-12):
                <select
                  name="month"
                  value={taskData.month}
                  onChange={handleInputChange}
                >
                  {[...Array(12).keys()].map((mon) => (
                    <option key={mon} value={mon + 1}>
                      {mon + 1}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Hour (0-23):
                <select
                  name="hour"
                  value={taskData.hour}
                  onChange={handleInputChange}
                >
                  {[...Array(24).keys()].map((hr) => (
                    <option key={hr} value={hr}>
                      {hr}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Minute (0-59):
                <select
                  name="minute"
                  value={taskData.minute}
                  onChange={handleInputChange}
                >
                  {[...Array(60).keys()].map((min) => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label>
            Expiry:
            <input
              type="datetime-local"
              name="expiry"
              value={taskData.expiry}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Message:
            <textarea
              name="message"
              placeholder="Task Message"
              value={taskData.message}
              onChange={handleInputChange}
            />
          </label>

          <button className="submit" onClick={create}>Submit</button>
          <button className="close" onClick={() => setShowForm(false)}>Close X</button>
        </div>
      )}
    </div>
  );
}

export default Filter;
