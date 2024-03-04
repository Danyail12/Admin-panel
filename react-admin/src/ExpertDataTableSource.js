export const expertColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "fullName",
      headerName: "fullName",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.name}
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
      field: "Specialization",
      headerName: "Specialization",
      width: 104,
    },
    {
      field: "city",
      headerName: "city",
      width: 104,
    },
    {
      field: "Location",
      headerName: "Location",
      width: 100,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  