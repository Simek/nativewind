import { render } from "@testing-library/react-native";
import { create } from "./utilities";
import {
  hairlineWidth,
  NativeWindStyleSheet,
  pixelRatio,
  platformSelect,
  styled,
} from "../src";

afterEach(() => {
  NativeWindStyleSheet.reset();
  jest.clearAllMocks();
});

test.skip("nested", () => {
  create("text-test", {
    theme: {
      fontSize: {
        // These tests run as ios with
        // a pixelRatio of 2
        test: platformSelect({
          ios: pixelRatio({
            1: "1rem",
            2: `var(--empty-var, ${hairlineWidth()})`,
          }),
          default: 2,
        }),
      },
    },
  });

  const MyComponent = jest.fn();
  const StyledComponent = styled(MyComponent);

  render(<StyledComponent className="text-test" />);

  expect(MyComponent).toHaveBeenCalledWith(
    {
      style: { fontSize: 32 },
    },
    {}
  );
});

test.skip("platformSelect", () => {
  create("text-test", {
    theme: {
      fontSize: {
        test: platformSelect({
          ios: "1rem", // These tests run as ios
          default: 2,
        }),
      },
    },
  });

  const MyComponent = jest.fn();
  const StyledComponent = styled(MyComponent);

  render(<StyledComponent className="text-test" />);

  expect(MyComponent).toHaveBeenCalledWith(
    {
      style: { fontSize: 16 },
    },
    {}
  );
});

test.skip("hairlineWidth", () => {
  create("text-test", {
    theme: {
      fontSize: {
        test: hairlineWidth(),
      },
    },
  });

  const MyComponent = jest.fn();
  const StyledComponent = styled(MyComponent);

  render(<StyledComponent className="text-test" />);

  expect(MyComponent).toHaveBeenCalledWith(
    {
      style: { fontSize: 0.5 },
    },
    {}
  );
});

test.skip("pixelRatio - get", () => {
  create("text-test", {
    theme: {
      fontSize: {
        test: pixelRatio(),
      },
    },
  });

  const MyComponent = jest.fn();
  const StyledComponent = styled(MyComponent);

  render(<StyledComponent className="text-test" />);

  expect(MyComponent).toHaveBeenCalledWith(
    {
      style: { fontSize: 2 },
    },
    {}
  );
});

test.skip("pixelRatio - specifics", () => {
  create("text-test", {
    theme: {
      fontSize: {
        test: pixelRatio({
          1: "1rem",
          2: "2rem",
          3: "3rem",
        }),
      },
    },
  });

  const MyComponent = jest.fn();
  const StyledComponent = styled(MyComponent);

  render(<StyledComponent className="text-test" />);

  expect(MyComponent).toHaveBeenCalledWith(
    {
      style: { fontSize: 32 },
    },
    {}
  );
});