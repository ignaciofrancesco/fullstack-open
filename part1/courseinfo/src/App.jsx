// App
const App = () => {
  const course = "Half Stack application development";

  const content = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <>
      <Header course={course} />
      <Content content={content} />
      <Total content={content} />
    </>
  );
};

// Header
const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

// Content
const Content = ({ content }) => {
  const [part1, part2, part3] = content;

  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  );
};

// Part
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Total
const Total = ({ content }) => {
  const total = content.reduce(
    (accumulated, part) => accumulated + part.exercises,
    0
  );

  return <p>Number of exercises: {total}</p>;
};

export default App;

/* const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

export default App;
 */
