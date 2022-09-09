<table className="table">
<thead>
  <tr>
    <th>ID</th>
    <th>NAME</th>
    <th>PRICE</th>
    <th>CATEGORY</th>
    <th>BRAND</th>
    <th>ACTIONS</th>
  </tr>
</thead>
<tbody>
  {buses.map((bus) => (
    <tr key={bus._id}>
      <td>{bus._id}</td>
      <td>{bus.operator}</td>
      <td>{bus.price}</td>
      <td>{bus.bus_type}</td>
      <td>{bus.operator}</td>
      <td>
        <button
          type="button"
          className="small"
          onClick={() =>
            navigate(`/bus/${bus._id}/edit`)
          }
        >
          Edit
        </button>
        <button
          type="button"
          className="small"
          onClick={() => deleteHandler(bus)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>