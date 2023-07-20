import React from 'react'
import "../styles/Portfolio.css"

function Portfolio() {
  return (
      <table className="styled-table">
          <thead>
              <tr>
                  <th>Symbol</th>
                  <th>Current Price</th>
                  <th>Purchase Price</th>
                  <th>Quantity</th>
                  <th>Gain/Loss</th>
                  <th>Trade Action</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
                  <td>...</td>
              </tr>
              {/* TODO: Repeat this <tr> block for each line of data */}
          </tbody>
      </table>
  )
}

export default Portfolio