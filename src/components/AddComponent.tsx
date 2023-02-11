import * as React from 'react';
import { useMemo } from "react";

interface AddComponentProps {
  a: number,
  b: number,
}

export default (props: AddComponentProps): JSX.Element => {
  const {a, b} = props;
  const sum = useMemo(() => a + b, [a, b]);
  return (
    <div>
      {a} + {b} = <span data-testid="result">{sum}</span>
    </div>
  );
}