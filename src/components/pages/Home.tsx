import { useState, useEffect } from "react";
import PageContent from "../Shared/PageContent";
import homeImage from "../../../src/assets/home.jpg";
import { getAuthToken } from "../../utils/auth";

function HomePage() {
  const [greeting, setGreeting] = useState("");
  const token = getAuthToken();

  useEffect(() => {
      setGreeting(token ? `Welcome back!` : `Wellcome!`);
  }, [token]);

  return (
    <PageContent title={greeting}>
      <p>Warehose Management System</p>
      {token && (
        <div className="main-image">
          <img src={homeImage} alt="Software Management System" />
        </div>
      )}
    </PageContent>
  );
}

export default HomePage;
