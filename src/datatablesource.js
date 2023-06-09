export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },

    {
      field: "phone",
      headerName: "Phone",
      width: 100,
    },
    
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "city",
    headerName: "city",
    width: 100,
  },
  {
    field: "address",
    headerName: "address",
    width: 100,
  },  {
    field: "distance",
    headerName: "distance",
    width: 100,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "rating",
    headerName: "rating",
    width: 100,
  },  
  {
    field: "featured",
    headerName: "featured",
    width: 100,
  },
  {
    field: "cheapestPrice",
    headerName: "cheapestPrice",
    width: 100,
  },
  {
    field: "description",
    headerName: "description",
    width: 230,
  },

];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];