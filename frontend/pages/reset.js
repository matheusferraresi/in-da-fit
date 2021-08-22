import RequestReset from '../components/RequestReset';
import ResetPassword from '../components/ResetPassword';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a reset password token!</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <ResetPassword token={query.token} />
    </div>
  );
}
