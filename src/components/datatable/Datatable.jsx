import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5000/api/${path}`
  );
  const [editRowId, setEditRowId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      // Handle error
    }
  };

  const handleEdit = (id) => {
    setEditRowId(id);
  };

  const handleCancelEdit = () => {
    setEditRowId(null);
  };

  const handleSaveEdit = async (id, updatedData) => {
    try {
      // Perform the edit/update operation using the appropriate API
      await axios.put(`http://localhost:5000/api/${path}/${id}`, updatedData);
      // Refresh the data after successful edit
      reFetch();
      setEditRowId(null);
    } catch (err) {
      // Handle error
    }
  };

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleCellEditCommit = async ({ id, field, value }) => {
    // Update the specific field of the row in the backend
    try {
      // Example endpoint: `http://localhost:5000/api/${path}/${id}`
      // Perform the update operation using the appropriate API
      await axios.put(`http://localhost:5000/api/${path}/${id}`, {
        [field]: value,
      });
    } catch (err) {
      // Handle error
    }
  };

  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => (
      <div className="cellAction">
        {editRowId === params.row._id ? (
          <>
            <button
              className="saveButton"
              onClick={() => handleSaveEdit(params.row._id, params.row)}
            >
              Save
            </button>
            <button
              className="cancelButton"
              onClick={() => handleCancelEdit()}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="editButton"
            onClick={() => handleEdit(params.row._id)}
          >
            Edit
          </button>
        )}
        <button
          className="deleteButton"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </button>
      </div>
    ),
  };

  const editableColumns = columns.map((column) => ({
    ...column,
    editable: editRowId !== null,
  }));

  const columnsWithAction = [...editableColumns, actionColumn];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columnsWithAction}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        components={{
          Toolbar: GridToolbar,
        }}
        onEditCellChangeCommitted={handleCellEditCommit}
        isCellEditable={(params) => params.field !== "action"}
      />
    </div>
  );
};

export default Datatable;