const fs = require("fs/promises");

const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts ");
  const data = await res.json();
  console.log(data);

  fs.writeFile("posts.json", JSON.stringify(data));
};

getPosts();

const filterPosts = async () => {
  const postsData = await fs.readFile("posts.json", "utf-8");
  const posts = JSON.parse(postsData);
  const newPosts = posts.filter((post) => {
    return post.title.length < 30;
  });
  fs.writeFile("posts.json", JSON.stringify(newPosts));
};

filterPosts();

const [, , method, email, name, age] = process.argv;
const users = async (method, email = '', name = '', age = 0) => {

  const existsUsers = await fs.readFile('users.json', 'utf-8');
  const existParseUsers = JSON.parse(existsUsers);

  if (method?.toUpperCase() === 'CREATE') {
    {
      if (existParseUsers.some((user) => user.email === email)) {
        console.log('this mail already exists');
      } else {
        const newUsers = {
          id: existParseUsers.length + 1,
          email,
          name,
          age: +age,
        };

        fs.writeFile(
          'users.json',
          JSON.stringify([...existParseUsers, newUsers])
        );
        console.log('User created successfully!');
      }
    }
  }

  if (method?.toUpperCase() === 'DELETE') {
    const filteredUsers = existParseUsers.filter(
      (user) => email !== user.email
    );
    fs.writeFile('users.json', JSON.stringify(filteredUsers));
  }
};

users(method, email, name, age);


const [, , sortBy] = process.argv;

const sortProducts = async (sortBy) => {
  const products = JSON.parse(await fs.readFile("product.json", "utf-8"));
  if (sortBy?.toUpperCase() === "ASC") {
    return products.sort((a, b) => a.price - b.price);
  } else if (sortBy?.toUpperCase() === "DESC") {
    return products.sort((a, b) => b.price - a.price);
  } else {
    console.log('Somthing went wrong, Use "ASC" or "DESC"');
  }
};

const res = async () => {
  const sortedProducts = await sortProducts(sortBy);
  console.log(sortedProducts);
};

res();
