---
category: writing
layout: post
body_id: blog
date: 2022-04-10 14:41:00+02:00
highlight_code: true
title: The Value of Unit Tests
description: While integration tests are more reliable to ensure a stable application, units tests are still valuable for testing finer details of individual components.
---

In the old days[^1], a school of thought about software testing was predominant. Unit tests were fast and cheap, while integration and end-to-end tests were slow and expensive. Software developers would focus on unit tests, writing many of them to build a solid foundation of well-tested code and complement that with fewer integration or end-to-end tests, ensuring critical user flows don’t break. We called that the testing pyramid. 

As computing power increased and machines for cheaper and easier to set up and tear down on demand, the focus of testing shifted more and more towards integration and end-to-end test because the value of unit tests is limited. A unit test won’t ensure a component works as expected in the broader context of your application. A unit test won’t tell when a component has been invoked with invalid properties; it won’t notify you when it breaks because of API changes.

But there is still value in writing unit tests, especially in the front end. Modern-day front-end applications consist of components of varying complexity. Some are more complex, rendering whole pages, including asynchronous API calls and user authentication. Others are simpler, small entities used to compose more complex components and pages. These components are usually without side effects; they take some properties and render according to the property values. 

A component taken from a recent project  — used to render information about the applicability of natural hazards at a particular geographic location — renders differently given different input: 

- The tag’s content changes depending on whether the hazard is applicable. 
- We ignore the value if it’s not set (for hazards that are always applicable), and
- We ignore the threshold value for hazard types without one. 

```jsx
import React from "react";

export default function HazardCard({
  name,
  isApplicable,
  value,
  threshold
}) {
  return (
    <div className="hazard-card">
      <h3>{name}</h3>
      <div className="tag">
        {isApplicable ? 'Applicable' : 'Not Applicable'}
      </div>
      {value && (
        <div className="value" data-testid="value">
          {value}
          {threshold && (
            <span className="threshold">
              {' '}/{' '}{ threshold }
            </span>
          )}
        </div>
      )}
    </div>
  );
}
```

None of this functionality requires any knowledge of its surroundings or the application state. It takes property values and renders its output accordingly. The component’s different use cases can be tested in isolation, using unit tests, independent from the rest of the application. Using Jest and React Testing Library, full test coverage for the component can be achieved with:

```jsx
import React from "react";

import { render, screen } from '@testing-library/react';
import HazardCard from './card';

describe("HazardCard", () => {
  it("renders the hazard name", () => {
    render(<HazardCard name="Tornado" />);
    const heading = screen.queryByText("Tornado");
    expect(heading).toBeInTheDocument();
  });

  it("renders Applicable", () => {
    render(<HazardCard name="Tornado" isApplicable={true} />);
    const applicableTag = screen.queryByText("Applicable");
    expect(applicableTag).toBeInTheDocument();
    const notApplicableTag = screen.queryByText("Not Applicable");
    expect(notApplicableTag).not.toBeInTheDocument();
  });

  it("renders Not Applicable", () => {
    render(<HazardCard name="Tornado" isApplicable={false} />);
    const applicableTag = screen.queryByText("Applicable");
    expect(applicableTag).not.toBeInTheDocument();
    const notApplicableTag = screen.queryByText("Not Applicable");
    expect(notApplicableTag).toBeInTheDocument();
  });

  it("does not render the value block", () => {
    render(<HazardCard name="Tornado" isApplicable={false} />);
    const valueBlock = screen.queryByTestId("value");
    expect(valueBlock).not.toBeInTheDocument();
  });

  it("renders the value", () => {
    render(<HazardCard name="Tornado" isApplicable={false} value={3} />);
    const valueBlock = screen.getByTestId("value");
    expect(valueBlock).toHaveTextContent("3");
  });

  it("renders the threshold", () => {
    render(<HazardCard name="Tornado" isApplicable={false} value={3} threshold={15} />);
    const valueBlock = screen.getByTestId("value");
    expect(valueBlock).toHaveTextContent("3 / 15");
  });
});
```

A focussed set of tests without any overhead that runs quickly. All we need to prepare is the component with the correct property values. 

The same tests implemented as an integration test potentially require additional overhead. We don’t just have to prepare the component itself for each test case but the whole page that includes the component. A page naturally being more complex than a single component might require some additional mocks to render successfully in a test. Many pages require authentication because they are fully or partially available to only a particular group of users. We have to stub API calls required to load content asynchronously. And once we get to testing components, we have to find the right component for each case on the page and test the conditions. 

The value of unit tests is their ability to test many conditions of a module quickly without much context. Combined with end-to-end tests, they can serve to verify finer details of individual components, ensuring that they will continue to work as expected when we change them months, even years, later. Ensuring that the application works as a whole is left to end-to-end tests.

[^1]: I’m allowed to say that because I’m 40