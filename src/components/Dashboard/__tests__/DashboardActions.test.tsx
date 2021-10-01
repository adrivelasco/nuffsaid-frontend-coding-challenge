import { render } from "@testing-library/react";

import { DashboardActions } from "../DashboardActions";

describe("DashboardActions", () => {
  it("should call onStart prop callback to suscribe", () => {
    const onStart = jest.fn(() => null);

    const { getByText } = render(<DashboardActions onStart={onStart} />);

    const btn = getByText("Start");

    btn.click();

    expect(onStart.mock.calls.length).toBe(1);
  });

  it("should call onStop prop callback to unsuscribe", () => {
    const onStop = jest.fn(() => null);

    const { getByText } = render(
      <DashboardActions isSubscribed={true} onStop={onStop} />
    );

    const btn = getByText("Stop");

    btn.click();

    expect(onStop.mock.calls.length).toBe(1);
  });

  it("should call onClear prop callback", () => {
    const onClear = jest.fn(() => null);

    const { getByText } = render(<DashboardActions onClear={onClear} />);

    const btn = getByText("Clear");

    btn.click();

    expect(onClear.mock.calls.length).toBe(1);
  });
});
