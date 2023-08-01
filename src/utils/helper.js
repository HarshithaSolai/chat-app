
export const getNameById = (users, id) => {
  const user = users.find((user) => user.id === id);
  return user ? user.name : null;
};

