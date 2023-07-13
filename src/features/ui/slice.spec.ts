import reducer, { UiState, setScreen } from "./slice";

describe("ui reducer", () => {
  const initialState: UiState = {
    screen: "main",
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle screen change", () => {
    expect(reducer(initialState, setScreen("settings")).screen).toEqual(
      "settings"
    );
  });
});
