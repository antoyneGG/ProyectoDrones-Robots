import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";

const User = ({ user, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push, back} = useRouter();

  const deleteUser = async () => {
    const { username } = query;
    try {
      await fetch(`http://localhost:3000/api/users/${username}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteUser();
    back();
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{user.username}</h1>
          <p>{user.password}</p>
          <p>{user.email}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button>
          </div>
        </Grid.Column>
      </Grid.Row>

      <Confirm
        content={`Are you sure to delete the User ${user.username}`}
        header="Please confirm"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { username } }) {
  const res = await fetch(`http://localhost:3000/api/users/${username}`);
  console.log("id es:", username)
  if (res.status === 200) {
    const user = await res.json();

    console.log(username)
    console.log("wawa")
    console.log(user)

    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default User;