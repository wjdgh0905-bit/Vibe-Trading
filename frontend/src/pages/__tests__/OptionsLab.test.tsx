import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { OptionsLab } from "../OptionsLab";
import type { OptionsGreeksResponse, OptionsPayoffResponse } from "@/lib/api";

const apiMock = vi.hoisted(() => ({
  getOptionsGreeks: vi.fn(),
  getOptionsPayoff: vi.fn(),
  getOptionsSurface: vi.fn(),
}));

vi.mock("@/lib/api", () => ({
  api: apiMock,
}));

// jsdom has no canvas 2D context, so echarts.init crashes on setOption there
// (same reason no other page test in this repo mounts an echarts chart
// directly) — stub it out and assert on the underlying data/API calls
// instead of chart internals.
vi.mock("@/lib/echarts", () => ({
  echarts: { init: () => ({ setOption: vi.fn(), resize: vi.fn(), dispose: vi.fn() }) },
  CHART_GROUP: "test-group",
  connectCharts: vi.fn(),
}));

function makeGreeksResponse(overrides: Partial<OptionsGreeksResponse> = {}): OptionsGreeksResponse {
  return {
    status: "ok",
    spot: 100,
    legs: [
      {
        index: 0,
        option_type: "call",
        strike: 100,
        expiry_days: 30,
        iv: 0.25,
        quantity: 1,
        price: 3.0626,
        delta: 0.537118,
        gamma: 0.055421,
        theta: -0.0189,
        vega: 0.113878,
        status: "ok",
      },
    ],
    aggregate: { delta: 0.537118, gamma: 0.055421, theta: -0.0189, vega: 0.113878, total_cost: 3.0626 },
    ...overrides,
  };
}

function makePayoffResponse(overrides: Partial<OptionsPayoffResponse> = {}): OptionsPayoffResponse {
  return {
    status: "ok",
    spot: 100,
    days_elapsed: 0,
    iv_shift: 0,
    entry_cost: 3.0626,
    prices: [50, 100, 150],
    expiry_pnl: [-3.0626, -3.0626, 46.9374],
    scenario_pnl: [-3, 0, 40],
    ...overrides,
  };
}

describe("OptionsLab page", () => {
  beforeEach(() => {
    apiMock.getOptionsGreeks.mockReset().mockResolvedValue(makeGreeksResponse());
    apiMock.getOptionsPayoff.mockReset().mockResolvedValue(makePayoffResponse());
    apiMock.getOptionsSurface.mockReset().mockResolvedValue({ status: "ok", symbol: "AAPL", expirations: [], points: [] });
  });

  it("fetches Greeks for the default single leg on mount", async () => {
    render(<OptionsLab />);

    await waitFor(() => expect(apiMock.getOptionsGreeks).toHaveBeenCalled());
    const call = apiMock.getOptionsGreeks.mock.calls[0][0];
    expect(call.legs).toHaveLength(1);
    expect(call.legs[0]).toMatchObject({ option_type: "call", strike: 100, expiry_days: 30, iv: 0.25, quantity: 1 });

    expect((await screen.findAllByText("0.5371")).length).toBeGreaterThan(0); // aggregate delta card + per-leg row
  });

  it("adds a leg and re-fetches Greeks with two legs", async () => {
    render(<OptionsLab />);
    await waitFor(() => expect(apiMock.getOptionsGreeks).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByTestId("add-leg"));
    expect(screen.getByTestId("leg-strike-1")).toBeInTheDocument();

    await waitFor(() => {
      const last = apiMock.getOptionsGreeks.mock.calls.at(-1)![0];
      expect(last.legs).toHaveLength(2);
    });
  });

  it("removes a leg and re-fetches Greeks with the remaining legs", async () => {
    render(<OptionsLab />);
    await waitFor(() => expect(apiMock.getOptionsGreeks).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByTestId("add-leg"));
    expect(screen.getByTestId("leg-strike-1")).toBeInTheDocument();
    await waitFor(() => {
      const last = apiMock.getOptionsGreeks.mock.calls.at(-1)![0];
      expect(last.legs).toHaveLength(2);
    });

    fireEvent.click(screen.getByTestId("leg-remove-1"));
    expect(screen.queryByTestId("leg-strike-1")).not.toBeInTheDocument();

    await waitFor(() => {
      const last = apiMock.getOptionsGreeks.mock.calls.at(-1)![0];
      expect(last.legs).toHaveLength(1);
    });
  });

  it("removing every leg clears Greeks instead of calling the API with an empty basket", async () => {
    render(<OptionsLab />);
    await waitFor(() => expect(apiMock.getOptionsGreeks).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByTestId("leg-remove-0"));

    expect(screen.getByText(/Add at least one leg/i)).toBeInTheDocument();
    // No further calls after the leg list becomes empty.
    await new Promise((r) => setTimeout(r, 400));
    expect(apiMock.getOptionsGreeks).toHaveBeenCalledTimes(1);
  });

  it("editing a leg field re-fetches Greeks with the updated strike", async () => {
    render(<OptionsLab />);
    await waitFor(() => expect(apiMock.getOptionsGreeks).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByTestId("leg-strike-0"), { target: { value: "110" } });

    await waitFor(() => {
      const last = apiMock.getOptionsGreeks.mock.calls.at(-1)![0];
      expect(last.legs[0].strike).toBe(110);
    });
  });

  it("moving the days-elapsed slider re-fetches the payoff curve with the new value", async () => {
    render(<OptionsLab />);

    fireEvent.click(screen.getByRole("button", { name: /Payoff & Scenario Explorer/i }));
    await waitFor(() => expect(apiMock.getOptionsPayoff).toHaveBeenCalled());
    const initialCalls = apiMock.getOptionsPayoff.mock.calls.length;

    fireEvent.change(screen.getByTestId("days-elapsed-slider"), { target: { value: "15" } });

    await waitFor(() => {
      expect(apiMock.getOptionsPayoff.mock.calls.length).toBeGreaterThan(initialCalls);
      const last = apiMock.getOptionsPayoff.mock.calls.at(-1)![0];
      expect(last.days_elapsed).toBe(15);
    });
  });

  it("moving the IV-shift slider re-fetches the payoff curve and renders the response", async () => {
    render(<OptionsLab />);

    fireEvent.click(screen.getByRole("button", { name: /Payoff & Scenario Explorer/i }));
    await waitFor(() => expect(apiMock.getOptionsPayoff).toHaveBeenCalled());

    apiMock.getOptionsPayoff.mockResolvedValueOnce(
      makePayoffResponse({ entry_cost: 5.4321, scenario_pnl: [-5, 1, 45] }),
    );
    fireEvent.change(screen.getByTestId("iv-shift-slider"), { target: { value: "0.1" } });

    await waitFor(() => {
      const last = apiMock.getOptionsPayoff.mock.calls.at(-1)![0];
      expect(last.iv_shift).toBeCloseTo(0.1);
    });
    expect(await screen.findByText("5.4321")).toBeInTheDocument(); // entry cost card picks up the new response
  });

  it("loads the vol surface only on explicit button click, not automatically", async () => {
    render(<OptionsLab />);

    fireEvent.click(screen.getByRole("button", { name: /Vol Surface/i }));
    // No auto-fetch just from switching tabs.
    await new Promise((r) => setTimeout(r, 100));
    expect(apiMock.getOptionsSurface).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId("load-surface"));
    await waitFor(() => expect(apiMock.getOptionsSurface).toHaveBeenCalledWith({ symbol: "AAPL", max_expirations: 6 }));
  });
});
