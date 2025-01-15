const data = {
  id: 1,
  title: "title",
  content: "hello",
};

/* const { title, content } = data; */
const title = data.title;
const content = data.content;
const id = data.id;

console.log(title, content);

const arr = [1, 2, 4, 8];
const [first, second, third] = arr;

console.log(first, second, third);

const query = "1; DROP TABLE user;";
