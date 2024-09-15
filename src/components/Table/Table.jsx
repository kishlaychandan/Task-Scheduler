import React, { useEffect, useState } from 'react';
import './Table.css';
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
function Table() {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch('http://localhost:3000/tasks');
      const datas = await res.json();
      setData(datas);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData(id) {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  async function editData(id) {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'PUT',
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Id</th>
            <th>Name</th>
            <th>Schedule</th>
            <th>Success count</th>
            <th>Error count</th>
            <th>Last success</th>
            <th>Last error</th>
            <th>Disabled</th>
            <th>Retries</th>
            <th>Status</th>
            <th>Next</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td><input type="checkbox" /></td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.schedule}</td>
                <td>{item.successCount}</td>
                <td>{item.errorCount}</td>
                <td>{item.lastSuccess}</td>
                <td>{item.lastError}</td>
                <td>{item.disabled ? 'Yes' : 'No'}</td>
                <td>{item.retries}</td>
                <td>{item.status? <TiTick /> : <ImCross />}</td>
                <td>{item.next}</td>
                <td>
                  <select name="" id="">
                    <option value="" onClick={editData}>edit</option>
                    <option value="" onClick={deleteData}>delete</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No Data Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
