import { redirect } from "react-router-dom";
// import { useEffect } from "react";

// import PageContent from "../components/Shared/PageContent";

// const LogoutPage: React.FC = () => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("expiration");
//         navigate("/");
//         navigate(0);
//     }, []);

//   return (
//     <PageContent title="Logout">
//       <></>
//     </PageContent>
//   );
// };

// export default LogoutPage;

export function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  return redirect("/");
}
