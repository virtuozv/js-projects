import React from "react";

export const Table = ({ data }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>
            <h1>Name</h1>
          </th>
          <th>
            <h1>Surname</h1>
          </th>
          <th>
            <h1>Email</h1>
          </th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <th>{item.first_name}</th>
            <th>{item.last_name}</th>
            <th>{item.email}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
