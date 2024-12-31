import React from "react";
import Dropdown from "../components/menu/Dropdown";
import Table from "../components/table/Table";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Home = () => {
  const data = [
    {
      id: 1,
      name: "Morning Shift",
    },
    {
      id: 2,
      name: "Afternoon Shift",
    },
    {
      id: 3,
      name: "Night Shift",
    },
  ];

  const column = [
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => row.index + 1, // Display serial number instead of actual ID
    },
    {
      header: "NAME",
      accessorKey: "name",
    },
    {
      header: "ACTION",
      cell: ({ row }) => {
        const actions = [
          {
            name: "Edit",
            icon: <FiEdit size={16} />,
            onClick: () => handleEditShift(row.original),
          },
          // {
          //   name: "View",
          //   icon: <FiEye size={16} />,
          //   onClick: () => console.log("View action for:", row.original),
          // },
          {
            name: "Delete",
            icon: <FiTrash2 size={16} />,
            onClick: () => handleDelete(row.original),
          },
        ];
        return <Dropdown actions={actions} />;
      },
    },
  ];
  return <Table data={data} columns={column} />;
};

export default Home;
