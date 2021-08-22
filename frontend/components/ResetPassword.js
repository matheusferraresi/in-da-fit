import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      message
      code
    }
  }
`;

export default function ResetPassword({ token }) {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, thrownError }] = useMutation(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const error = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await resetPassword().catch(console.error);
    resetForm();
  }
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={thrownError || error} />
      {data?.redeemUserPasswordResetToken === null && (
        <p>Success! You can now sign in!</p>
      )}
      <fieldset disabled={data?.createUser} aria-busy={data?.createUser}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
