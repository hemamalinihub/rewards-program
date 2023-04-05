import { render, screen, within } from "@testing-library/react";
import RewardsCalc from "./rewardsCal";

const mockCustomer = {
  customer: [
    {
      transaction_id: 1,
      customer_id: 1000,
      name: "Hema Priya",
      transaction_amt: 250,
      currency: "USD",
    },
    {
      transaction_id: 2,
      customer_id: 1232,
      name: "Priya Shiva",
      transaction_amt: 350,
      currency: "USD",
    },
  ],
};

const mockCustomerBoundary = {
  customer: [
    {
      transaction_id: 1,
      customer_id: 1000,
      name: "Hema Priya",
      transaction_amt: 23,
      currency: "USD",
    },
    {
      transaction_id: 2,
      customer_id: 1232,
      name: "Priya Shiva",
      transaction_amt: 76,
      currency: "USD",
    },
  ],
};

describe("rewardCalc component", () => {
  test("normal value test", async () => {
    let rewardPtArray = [200, 250];
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCustomer),
    });
    render(<RewardsCalc />);

    await screen.findByText("Hema Priya", { timeout: 2000 });

    mockCustomer.customer.forEach((cust, index) => {
      // eslint-disable-next-line testing-library/no-node-access
      const row = screen.getByText(cust.name).closest("tr");
      const utils = within(row);
      expect(utils.getByText(rewardPtArray[index])).toBeInTheDocument();
    });
  });

  test("boundary value test", async () => {
    let rewardPtArray = [0, 26];
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCustomerBoundary),
    });
    render(<RewardsCalc />);

    await screen.findByText("Hema Priya", { timeout: 2000 });

    mockCustomer.customer.forEach((cust, index) => {
      // eslint-disable-next-line testing-library/no-node-access
      const row = screen.getByText(cust.name).closest("tr");
      const utils = within(row);
      expect(utils.getByText(rewardPtArray[index])).toBeInTheDocument();
    });
  });
});
