import { useEffect, useState } from "react";

function RewardsCalc() {
  const [val, setVal] = useState([]);
  const getData = () => {
    fetch("./data.json")
      .then((resp) => resp.json())
      .then((response) => {
        setRewardPoints(response.customer);
      });
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function setRewardPoints(customerArray) {
    customerArray.forEach((customer) => {
      customer.rewardPt = calculateRewardPoints(customer);
    });
    setVal(customerArray);
  }
  function calculateRewardPoints(customer) {
    if (customer.transaction_amt < 50) {
      return 0;
    } else if (customer.transaction_amt < 100) {
      return customer.transaction_amt - 50;
    } else {
      const pointsForHundred =
        (Math.floor(customer.transaction_amt / 100) * 100) / 2;
      const pointsAboveHundred = (customer.transaction_amt % 100) * 2;
      return pointsForHundred + pointsAboveHundred;
    }
  }

  return (
    <>
      <table className="reward-table">
        <thead>
          <tr>
            <th className="th">Id</th>
            <th className="th">Name</th>
            <th className="th">Amount in USD</th>
            <th className="th">Reward Point</th>
          </tr>
        </thead>
        <tbody>
          {val.map((value, index) => {
            return (
              <tr key={index}>
                <td key={index + "cid"} className="td">
                  {value.customer_id}
                </td>
                <td key={index + "nm"} className="td">
                  {value.name}
                </td>
                <td key={index + "amt"} className="td">
                  {value.transaction_amt}
                </td>
                <td key={index + "pt"} className="td">
                  {value.rewardPt}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
export default RewardsCalc;
