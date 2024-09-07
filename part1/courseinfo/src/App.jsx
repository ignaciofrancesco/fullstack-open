// App
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

// Header
const Header = (props) => {
  return <h1>{props.name}</h1>;
};

// Content
const Content = (props) => {
  console.log(props);

  const [part1, part2, part3] = props.parts;

  return (
    <>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </>
  );
};

// Part
const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

// Total
const Total = (props) => {
  console.log("Total props: ", props);

  const [part1, part2, part3] = props.parts;

  const total = part1.exercises + part2.exercises + part3.exercises;

  return <p>Number of exercises: {total}</p>;
};

export default App;
