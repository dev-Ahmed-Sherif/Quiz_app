import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ columns, rows }) {
  useEffect(() => {
    setTimeout(() => {
      let ele = document.getElementsByClassName(
        "css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar"
      );
      // console.log(ele);
      // console.log(ele[0].children[1].innerHTML);
      ele[0].children[1].innerHTML = ": عدد الصفوف المتاحة";
    });
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
