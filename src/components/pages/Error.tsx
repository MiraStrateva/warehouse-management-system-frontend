import { useRouteError } from 'react-router-dom';
import MainNavigation from '../Shared/MainNavigation';

import PageContent from '../Shared/PageContent';

function ErrorPage() {
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  //console.log(error);

//   if (error.status === 500) {
//     message = error.data.message;
//   }

//   if (error.status === 404) {
//     title = 'Not found!';
//     message = 'Could not find resource or page.';
//   }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
