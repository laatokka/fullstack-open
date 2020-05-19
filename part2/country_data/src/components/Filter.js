import React from 'react'

const Filter = ({ filter, handleFilter }) => (
    <div>
        <input
            value={filter}
            onChange={handleFilter}
        />
    </div>
)

export default Filter